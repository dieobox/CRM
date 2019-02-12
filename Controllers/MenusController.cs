using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CRM.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using CRM.ViewModels.Menus;
using System.Collections;
using CRM.Data;

namespace DEPIntranet.Controllers
{
    [Authorize]
    public class MenusController : Controller
    {
        private readonly ILogger _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext DB;

        public MenusController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILoggerFactory loggerFactory, ApplicationDbContext db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            DB = db;
            _logger = loggerFactory.CreateLogger<MenusController>();
        }

        // GET: /<controller>/
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> Index()
        {
            var CurrentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
            var GetRoles = await _userManager.GetRolesAsync(CurrentUser);
            return View();
        }

        // Get Menus
        public async Task<IActionResult> GetMenus()
        {
            var Menus = await DB.Menus.ToListAsync();
            return PartialView(Menus);
        }

        // Form Add Menu
        [Authorize(Roles = "Administrator")]
        public IActionResult FormAddMenu()
        {
            return PartialView();
        }

        // Add Menu
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMenu(Menus model)
        {
            string msg = "";
            try
            {
                DB.Menus.Add(model);
                await DB.SaveChangesAsync();
                msg = "บันทึกข้อมูลสำเร็จ";
            }
            catch(Exception e)
            {
                msg = "Error is :" + e.InnerException;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        // Form Edit Menu
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> FormEditMenu(int MenuId)
        {
            var Menu = await DB.Menus.Where(a => a.MenuId == MenuId).SingleAsync();
            return PartialView(Menu);
        }

        // Edit Menu
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditMenu(Menus model)
        {
            string msg = "";
            try
            {
                DB.Menus.Attach(model);
                DB.Menus.Update(model);
                await DB.SaveChangesAsync();
                msg = "แก้ไขข้อมูลสำเร็จ";
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        // Delete Menu
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteMenu(int MenuId)
        {
            string msg = "";
            try
            {
                if (DB.MenuItems.Where(a => a.MenuId == MenuId).Count() > 0)
                {
                    msg = "ไม่สามารถลบข้อมูลได้ เนื่องจากมีข้อมูลอยู่ภายในเมนูนี้";
                    return Json(new { valid = false, message = msg });
                }
                var Menu = await DB.Menus.Where(a => a.MenuId == MenuId).SingleAsync();
                DB.Menus.Remove(Menu);
                await DB.SaveChangesAsync();
                msg = "ลบข้อมูลเรียบร้อย";
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        // ------------------------ Menu Item --------------------------
        // Menu Item
        [Authorize(Roles = "Administrator")]
        public IActionResult MenuItems(int MenuId)
        {
            ViewBag.MenuId = MenuId;
            return View();
        }

        // Get Menu Item
        public async Task<IActionResult> GetMenuItems(int MenuId)
        {
            ViewBag.MenuName = await DB.Menus.Where(a => a.MenuId == MenuId).Select(b => b.MenuName).SingleAsync();
            var Data = await DB.MenuItems.Where(a => a.MenuId == MenuId).ToListAsync();
            return PartialView(Data);
        }

        // Form Add Menu Item
        [Authorize(Roles = "Administrator")]
        public IActionResult FormAddMenuItem(int MenuId)
        {
            ViewBag.MenuId = MenuId;
            return PartialView();
        }

        // Add Menu Item
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMenuItem(MenuItems model)
        {
            string msg = "";
            try
            {
                int LastPosition = await DB.MenuItems.Where(a => a.MenuId == model.MenuId && a.ParentId == 0).Select(b => b.Position).MaxAsync();
                model.Position = LastPosition + 1;
                DB.MenuItems.Add(model);
                await DB.SaveChangesAsync();
                msg = "บันทึกข้อมูลสำเร็จ";
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = model.MenuId });
            }
            return Json(new { valid = true, message = msg, type = model.MenuId });
        }

        // Form Edit Menu Item
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> FormEditMenuItem(int MenuITemId)
        {
            var Data = await DB.MenuItems.Where(a => a.MenuItemId == MenuITemId).SingleAsync();
            return PartialView(Data);
        }

        // Edit Menu Item
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditMenuItem(MenuItems model)
        {
            string msg = "";
            try
            {
                if(model.MenuType == true)
                {
                    model.Url = "";
                }
                else
                {
                    model.Controller = "";
                    model.Action = "";
                }
                DB.MenuItems.Attach(model);
                DB.MenuItems.Update(model);
                await DB.SaveChangesAsync();
                msg = "แก้ไขข้อมูลสำเร็จ";
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = model.MenuId });
            }
            return Json(new { valid = true, message = msg, type = model.MenuId });
        }

        // Delete Menu Item
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteMenuItem(int MenuItemId)
        {
            string msg = "";
            int MenuId = 0;
            try
            {
                var DelMenuItem = await DB.MenuItems.Where(a => a.MenuItemId == MenuItemId).SingleAsync();
                MenuId = DelMenuItem.MenuId;
                int CountParent = await DB.MenuItems.Where(a => a.ParentId == DelMenuItem.MenuItemId).CountAsync();
                if(CountParent > 0)
                {
                    msg = "ไม่สามารถลบข้อมูลได้ เนื่องจากมีเมนูย่อยในเมนูนี้";
                    return Json(new { valid = false, message = msg, type = MenuId });
                }
                DB.MenuItems.Remove(DelMenuItem);
                await DB.SaveChangesAsync();
                msg = "ลบข้อมูลสำเร็จ";
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = MenuId });
            }
            return Json(new { valid = true, message = msg, type = MenuId });
        }

        // Delete All MenuItem
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteAllMenuItem(int MenuId)
        {
            string msg = "";
            try
            {
                var DelMenus = await DB.MenuItems.Where(a => a.ParentId == MenuId).ToListAsync();
                DB.MenuItems.RemoveRange(DelMenus);
                await DB.SaveChangesAsync();
                msg = "ลบข้อมูลสำเร็จ";
            }
            catch (Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = MenuId });
            }
            return Json(new { valid = true, message = msg, type = MenuId });
        }

        // -------------------------- Get Menu ---------------------------
        //Get Menu
        public async Task<IActionResult> GetSystemMenus(string UserId)
        {
            var currentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
            var Gets = await DB.UserRoles.Where(a => a.UserId == currentUser.Id).ToListAsync();
            var UserRoles = new List<RoleMenuViewModel>();
            var Menus = await DB.RoleMenus.Include(b => b.MenuItems).Where(a => a.MenuItems.MenuId == 1 && a.MenuItems.Enable == true).ToListAsync();
            foreach (var Get in Gets)
            {
                //var RoleMenus = new RoleMenuViewModel();
                foreach (var Menu in Menus.Where(a => a.RoleId == Get.RoleId))
                {
                    var RoleMenus = new RoleMenuViewModel();
                    RoleMenus.RoleIdInRoleMenu = Get.RoleId;
                    RoleMenus.MenuItemId = Menu.MenuItemId;
                    RoleMenus.MenuItemName = Menu.MenuItems.MenuItemName;
                    RoleMenus.ParentId = Menu.MenuItems.ParentId;
                    RoleMenus.Position = Menu.MenuItems.Position;
                    RoleMenus.MenuType = Menu.MenuItems.MenuType;
                    RoleMenus.Controller = Menu.MenuItems.Controller;
                    RoleMenus.Action = Menu.MenuItems.Action;
                    RoleMenus.Url = Menu.MenuItems.Url;
                    RoleMenus.Icon = Menu.MenuItems.Icon;
                    UserRoles.Add(RoleMenus);
                }
            }
            //string RoleId = "67b47526-2ddb-4cb5-b96b-5df8dcdc68c2";
            
            return PartialView(UserRoles);
        }

        // -------------------------- Role Menu -------------------------
        // Role Menu
        [Authorize(Roles = "Administrator")]
        public IActionResult RoleMenu()
        {
            //var GetDefaultRoleId = await DB.Roles.Select(a => a.Id).FirstOrDefaultAsync();
            //ViewBag.Filter = new SelectList(await DB.Roles.OrderBy(r => r.Name).ToListAsync(), "Id", "Name", GetDefaultRoleId);
            return View();
        }

        // Get Role Menu
        public async Task<IActionResult> GetMenuForManage()
        {
            //var Menus = await DB.MenuItems.Include(a => a.RoleMenus).Where(b => b.Enable == true).OrderBy(c => c.Position).ToListAsync();
            var Menus = await DB.Menus.ToListAsync();
            return PartialView(Menus);
        }

        // Manage Role Menu
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> ManageRoleMenu(int MenuId)
        {
            var GetDefaultRoleId = await DB.Roles.Select(a => a.Id).FirstOrDefaultAsync();
            ViewBag.MenuId = MenuId;
            ViewBag.Filter = new SelectList(await DB.Roles.OrderBy(r => r.Name).ToListAsync(), "Id", "Name", GetDefaultRoleId);
            return View();
        }

        // Get Role Menu
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetMenuItemForManage(int MenuId, string RoleId)
        {
            ViewBag.MenuId = MenuId;
            ViewBag.RoleId = RoleId;
            var Menus = await DB.MenuItems.Include(a => a.RoleMenus).Where(b => b.MenuId == MenuId && b.Enable == true).OrderBy(c => c.Position).ToListAsync();
            return PartialView(Menus);
        }

        // Add Permission
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<IActionResult> AddPermission(int[] MenuItemId, string RoleId, int MenuId)
        {
            string msg = "";
            try
            {
                if (MenuItemId != null)
                {
                    if (await DB.RoleMenus.Where(a=>a.RoleId == RoleId).CountAsync() > 0)
                    {
                        var InModel = await DB.RoleMenus.Where(f => f.RoleId == RoleId).ToListAsync();
                        DB.RoleMenus.RemoveRange(InModel);
                        await DB.SaveChangesAsync();
                    }

                    foreach (var Data in MenuItemId)
                    {
                        var modelSave = new RoleMenus();
                        modelSave.MenuItemId = Data;
                        modelSave.RoleId = RoleId;
                        DB.RoleMenus.Add(modelSave);
                        msg = "บันทึกข้อมูลสำเร็จ";
                    }
                    await DB.SaveChangesAsync();
                }
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = MenuId });
            }
            return Json(new { valid = true, message = msg, type = MenuId });
        }

        // -------------------------- Position Menu ---------------------------
        // Update Position
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdatePosition(string Position, int MenuId)
        {
            string msg = "";
            try
            {
                List<Item> UpdateParentId = JsonConvert.DeserializeObject<List<Item>>(Position);
                int NewPosition = 1;
                foreach (var NewParent in UpdateParentId)
                {
                    var MainMenus = await DB.MenuItems.Where(a => a.MenuItemId == NewParent.id).SingleAsync();
                    MainMenus.ParentId = 0;
                    MainMenus.Position = NewPosition;
                    DB.MenuItems.Attach(MainMenus);
                    DB.MenuItems.Update(MainMenus);
                    await DB.SaveChangesAsync();
                    
                    int SubPosition = 1;
                    foreach (var List in NewParent.children)
                    {
                        var SubMenus = await DB.MenuItems.Where(a => a.MenuItemId == List.id).SingleAsync();
                        SubMenus.ParentId = NewParent.id;
                        SubMenus.Position = SubPosition;
                        DB.MenuItems.Attach(SubMenus);
                        DB.MenuItems.Update(SubMenus);
                        await DB.SaveChangesAsync();
                        
                        int SubPosi = 1;
                        foreach (var List2 in List.children)
                        {
                            var SubMenus2 = await DB.MenuItems.Where(a => a.MenuItemId == List2.id).SingleAsync();
                            SubMenus2.ParentId = List.id;
                            SubMenus2.Position = SubPosi;
                            DB.MenuItems.Attach(SubMenus2);
                            DB.MenuItems.Update(SubMenus2);
                            await DB.SaveChangesAsync();
                            SubPosi++;
                        }
                        SubPosition++;
                    }
                    NewPosition++;
                }
                msg = "เรียงลำดับข้อมูลสำเร็จ";
            }
            catch(Exception e)
            {
                msg = "Error is : " + e.InnerException;
                return Json(new { valid = false, message = msg, type = MenuId });
            }
            return Json(new { valid = true, message = msg, type = MenuId });
        }

        [Serializable]
        public class Item
        {
            public int id { get; set; }
            public List<SubItem> children { get; set; }
        }

        [Serializable]
        public class SubItem
        {
            public int id { get; set; }
            public List<SubItem2> children { get; set; }
        }

        [Serializable]
        public class SubItem2
        {
            public int id { get; set; }
        }
    }
}
