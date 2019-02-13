using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using CRM.Models;
using CRM.ViewModels.UsersManagement;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Net.Http.Headers;
using System.Drawing;
using Microsoft.AspNetCore.Hosting;
using ImageResizer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using CRM.Data;

namespace DEPIntranet.UsersManagement
{
    [Authorize]
    public class UsersManagement : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment  _environment;

        public UsersManagement(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ILoggerFactory loggerFactory, 
            ApplicationDbContext db, 
            IHostingEnvironment environment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            DB = db;
            _environment = environment;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        [AllowAnonymous]
        [Authorize(Roles = "Administrator")]
        public IActionResult Gets(int Type)
        {
            var ViewModel = new List<ListsUserViewModel>();
            var Gets = DB.Users;
            foreach (var Get in Gets)
            {
                var Model = new ListsUserViewModel();
                Model.UserId = Get.Id;
                Model.Fullname = Get.FirstName + " " + Get.LastName;
                Model.mail = Get.Email;
                Model.Username = Get.UserName;
                ViewModel.Add(Model);
            }
            return PartialView(ViewModel);
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public IActionResult FormAddUser()
        {
            return PartialView("FormAddUser");
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult>  AddUser(AddUserViewModel model, IFormFile PictureFile)
        {
            string msg = "";
            try
            {
                if (PictureFile != null && PictureFile.Length > 0)
                {
                    if (PictureFile.ContentType != "image/jpeg" && PictureFile.ContentType != "image/png")
                    {
                        return Json(new { valid = false, message = "ไม่สามารถบันทึก กรุณาเลือกเฉพาะรูปนามสกุล jpeg, png" });
                    }

                    var Uploads = Path.Combine(_environment.WebRootPath.ToString(), "uploads/users/");
                    if (PictureFile.Length > 0)
                    {
                        string fileName = ContentDispositionHeaderValue.Parse(PictureFile.ContentDisposition).FileName.Trim('"');
                        string UniqueFileName = string.Format(@"{0}", Guid.NewGuid()) + fileName.ToString();

                        using (var fileStream = new FileStream(Path.Combine(Uploads, UniqueFileName), FileMode.Create))
                        {
                            await PictureFile.CopyToAsync(fileStream);
                        }

                        model.PictureFile = UniqueFileName;
                        ImageBuilder.Current.Build(Path.Combine(Uploads, UniqueFileName), Path.Combine(Uploads, UniqueFileName), new ResizeSettings("format=jpg&mode=max&quality=50"), true);
                    }
                }

                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PictureFile = model.PictureFile,
                    PhoneNumber = model.PhoneNumber,
                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var currentUser = await _userManager.FindByEmailAsync(user.Email);
                    var GetAllRoles = await _roleManager.Roles.Where(w => w.Name == "Users").ToListAsync();
                    foreach (var GetAllRole in GetAllRoles)
                    {
                        var roleresult = await _userManager.AddToRoleAsync(currentUser, GetAllRole.Name);
                    }

                    return Json(new { valid = true, message = "บันทึกข้อมูลสำเร็จ" });
                }
                else
                {
                    foreach (var Error in result.Errors)
                    {
                        msg = Error.Description + "<br/>";
                    }
                    return Json(new { valid = false, message = msg });
                }
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public IActionResult FormEditUser(string UserId)
        {
            var Model = new AddUserViewModel();
            var Get = DB.Users.Where(w => w.Id == UserId).FirstOrDefault();
            Model.Email = Get.Email;
            Model.FirstName = Get.FirstName;
            Model.LastName = Get.LastName;
            Model.PhoneNumber = Get.PhoneNumber;
            Model.UserId = Get.Id;
            Model.PictureFile = Get.PictureFile;
            return PartialView("FormEditUser", Model);
        }
        
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> EditUser(AddUserViewModel model, IFormFile PictureFile, string OldPictureFile, string OldPassword)
        {
            string msg = "";
            try
            {
                var ThisUser = await _userManager.FindByIdAsync(model.UserId);

                if (PictureFile != null && PictureFile.Length > 0)
                {
                    if (PictureFile.ContentType != "image/jpeg" && PictureFile.ContentType != "image/png")
                    {
                        return Json(new { valid = false, message = "ไม่สามารถบันทึก กรุณาเลือกเฉพาะรูปนามสกุล jpeg, png" });
                    }

                    var Uploads = Path.Combine(_environment.WebRootPath.ToString(), "uploads/users/");
                    if (PictureFile.Length > 0)
                    {
                        string GetOldPictureFile = await DB.Users.Where(v => v.Id == model.UserId).Select(c => c.PictureFile).FirstOrDefaultAsync();
                        if (GetOldPictureFile != null)
                        {
                            string Oldfilepath = Path.Combine(Uploads, GetOldPictureFile);
                            if (System.IO.File.Exists(Oldfilepath))
                            {
                                System.IO.File.Delete(Oldfilepath);
                            }
                        }

                        string fileName = ContentDispositionHeaderValue.Parse(PictureFile.ContentDisposition).FileName.Trim('"');
                        string UniqueFileName = string.Format(@"{0}", Guid.NewGuid()) + fileName.ToString();

                        using (var fileStream = new FileStream(Path.Combine(Uploads, UniqueFileName), FileMode.Create))
                        {
                            await PictureFile.CopyToAsync(fileStream);
                        }

                        ThisUser.PictureFile = UniqueFileName;
                        ImageBuilder.Current.Build(Path.Combine(Uploads, UniqueFileName), Path.Combine(Uploads, UniqueFileName), new ResizeSettings("format=jpg&mode=max&quality=50"), true);
                    }
                }

                if (PictureFile == null)
                {
                    ThisUser.PictureFile = OldPictureFile;
                }

                ThisUser.UserName = model.Email;
                ThisUser.FirstName = model.FirstName;
                ThisUser.LastName = model.LastName;
                ThisUser.Email = model.Email;
                ThisUser.PhoneNumber = model.PhoneNumber;

                string GeneratePassword = "";
                if (model.Password == null)
                {
                    GeneratePassword = OldPassword;
                }
                else
                {
                    GeneratePassword = model.Password;
                    var Code = await _userManager.GeneratePasswordResetTokenAsync(ThisUser);
                    var NewPassword = await _userManager.ResetPasswordAsync(ThisUser, Code, GeneratePassword);
                }
                
                var result = await _userManager.UpdateAsync(ThisUser);
                if (result.Succeeded)
                {
                    return Json(new { valid = true, message = "แก้ไขข้อมูลสำเร็จ" });
                }
                else
                {
                    foreach (var Error in result.Errors)
                    {
                        msg = Error.Description + "<br/>";
                    }

                    return Json(new { valid = false, message = msg });
                }
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteUser(string UserId)
        {
            string msg = "";
            try
            {
                var CurrentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
                var Upload = Path.Combine(_environment.WebRootPath, "uploads/users/");
                string OldPictureFile = DB.Users.Where(a => a.Id == UserId).Select(b => b.PictureFile).SingleOrDefault();
                if (OldPictureFile != null)
                {
                    string oldfilepath = Path.Combine(Upload, OldPictureFile);
                    // ลบ File เดิม
                    if (System.IO.File.Exists(oldfilepath))
                    {
                        System.IO.File.Delete(oldfilepath);
                    }
                }

                // delete all role user
                if (DB.UserRoles.Where(w => w.UserId == UserId).Count() > 0)
                {
                    var GetRoles = DB.UserRoles.Where(w => w.UserId == UserId);
                    DB.RemoveRange(GetRoles);
                    DB.SaveChanges();
                }

                var Model = await DB.Users.Where(d => d.Id == UserId).SingleAsync();
                await _userManager.DeleteAsync(Model);
                await DB.SaveChangesAsync();
                msg = "ลบข้อมูลสำเร็จ";

            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        // Role Management
        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public IActionResult Roles()
        {
            return View("Roles");
        }

        [Authorize]
        [HttpGet]
        [AllowAnonymous]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetRoles()
        {
            var Gets = await _roleManager.Roles.ToListAsync();
            var Roles = new List<RoleViewModel>();
            foreach (var Get in Gets)
            {
                var Role = new RoleViewModel();
                Role.RoleName = Get.Name;
                Role.RoleId = Get.Id;

                Roles.Add(Role);
            }


            return PartialView("GetRoles", Roles);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public IActionResult FormAddRole()
        {
            return PartialView("FormAddRole");
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddRole(RoleViewModel model)
        {
            string msg = "";
            try
            {
                var Result = await _roleManager.CreateAsync(new IdentityRole(model.RoleName));
                if (Result.Succeeded)
                {
                    return Json(new { valid = true, message = "บันทึกข้อมูลสำเร็จ" });
                }
                else
                {
                    foreach (var Error in Result.Errors)
                    {
                        msg = Error.Description + "<br/>";
                    }
                    return Json(new { valid = false, message = msg });
                }
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> FormEditRole(string RoleId)
        {
            var Get = await _roleManager.Roles.Where(i => i.Id == RoleId).FirstOrDefaultAsync();
            var ViewModel = new RoleViewModel();
            ViewModel.RoleId = Get.Id;
            ViewModel.RoleName = Get.Name;


            return PartialView("FormEditRole", ViewModel);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditRole(RoleViewModel model)
        {
            string msg = "";
            try
            {
                IdentityRole thisRole = await _roleManager.FindByIdAsync(model.RoleId);
                thisRole.Name = model.RoleName;
                var Result = await _roleManager.UpdateAsync(thisRole);
                if (Result.Succeeded)
                {
                    return Json(new { valid = true, message = "แก้ไขข้อมูลสำเร็จ" });
                }
                else
                {
                    foreach (var Error in Result.Errors)
                    {
                        msg = Error.Description + "<br/>";
                    }
                    return Json(new { valid = false, message = msg });
                }
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> DeleteRole(string RoleId)
        {
            string msg = "";
            try
            {
                if (await DB.UserRoles.Where(w => w.RoleId == RoleId).CountAsync() > 0)
                {
                    return Json(new { valid = false, message = "ไม่สามารถลบข้อมูลนี้ได้" });
                }

                IdentityRole ThisRole = await _roleManager.FindByIdAsync(RoleId);
                var Result = await _roleManager.DeleteAsync(ThisRole);
                if (Result.Succeeded)
                {
                    return Json(new { valid = true, message = "ลบข้อมูลสำเร็จ" });
                }
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }

            return Json(new { valid = false, message = msg });
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> GetUserRoles(string UserId)
        {
            var Gets = await DB.UserRoles.Where(a => a.UserId == UserId).ToListAsync();
            var UserRolesViewModel = new List<UserRolesViewModel>();
            foreach (var Get in Gets)
            {
                var UserRoles = new UserRolesViewModel();
                UserRoles.UserId = Get.UserId;
                UserRoles.RoleId = Get.RoleId;
                UserRoles.RoleName = await _roleManager.Roles.Where(s => s.Id == Get.RoleId).Select(s => s.Name).FirstOrDefaultAsync();
                UserRolesViewModel.Add(UserRoles);
            }

            ViewBag.Roles = new SelectList(await DB.Roles.OrderBy(a => a.Name).ToListAsync(), "Id", "Name");

            return PartialView("GetUserRoles", UserRolesViewModel);
        }
        
        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> AddUSerRole(string UserId, string RoleId)
        {
            string msg = "";
            try
            {
                var GetRole = await _roleManager.FindByIdAsync(RoleId);
                var GetRoleName = await _roleManager.GetRoleNameAsync(GetRole);

                var ThisUser = await _userManager.FindByIdAsync(UserId);
                var roleresult = await _userManager.AddToRoleAsync(ThisUser, GetRoleName);
                if (roleresult.Succeeded)
                {
                    msg = "บันทึกข้อมูลสำเร็จ";
                    return Json(new { valid = true, message = msg });
                }
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
            return View();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet]
        public async Task<IActionResult> DeleteUserRole(string UserId, string RoleId)
        {
            string msg = "";
            try
            {
                var GetRoleInUser = await DB.UserRoles.Where(s => s.UserId == UserId).CountAsync();
                if (GetRoleInUser == 1)
                {
                    return Json(new { valid = false, message = "ไม่สามารถลบข้อมูลนี้ได้" });
                }

                var UserRole = await DB.UserRoles.Where(a => a.UserId == UserId && a.RoleId == RoleId).FirstOrDefaultAsync();
                DB.UserRoles.Remove(UserRole);
                await DB.SaveChangesAsync();
                msg = "ลบข้อมูลสำเร็จ";
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }









        // Other Action
        private IActionResult RedirectToLocal(string returnUrl)
        {
            throw new NotImplementedException();
        }
    }
}
