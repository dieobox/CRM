using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using CRM.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CRM.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using CRM.ViewModels.Comment;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CRM.Controllers
{
    [Authorize]
    public class CommentController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;
        public CRM.Helpers.Utility Helper;

        public CommentController(
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
            Helper = new CRM.Helpers.Utility(_signInManager, DB);
        }

        [HttpGet]
        public IActionResult Index(string CustomerId)
        {
            ViewBag.CustomerId = CustomerId;
            ViewBag.CustomerName = DB.Customers.Where(w => w.CustomerId == CustomerId).Select(s => s.CompanyName).FirstOrDefault();
            return View();
        }

        [HttpGet]
        public IActionResult Gets(string CustomerId)
        {
            var Gets = DB.Comments.Where(w=>w.CustomerId == CustomerId).ToList();
            var User = DB.Users;
            var Customer = DB.Customers;
            var ViewModels = new List<GetCommentViewModels>();
            foreach (var Get in Gets)
            {
                var Model = new GetCommentViewModels();
                Model.Title = Get.Title;
                Model.Comment = Get.Comment;
                Model.CommentBy = User.Where(w => w.Id == Get.CommentBy).Select(s => s.FirstName + " " + s.LastName).FirstOrDefault();
                Model.CommentDate = Helper.getShortDateAndTime(Get.CommentDate);
                Model.CommentId = Get.CommentId;
                Model.CustomerName = Customer.Where(w => w.CustomerId == Get.CustomerId).Select(s => s.CompanyName).FirstOrDefault();
                ViewModels.Add(Model);
            }
            
            return PartialView("Gets", ViewModels);
        }

        [HttpGet]
        public IActionResult FormAdd(string CustomerId)
        {
           
            ViewBag.CustomerId = CustomerId;
            return PartialView("FormAdd");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Add(Comments Model)
        {
            var CurrentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
            string msg = "";
            try
            {
                Model.CommentBy = CurrentUser.Id;
                Model.CommentDate = DateTime.Now;
                DB.Comments.Add(Model);
                DB.SaveChanges();
                msg = "บันทึกสำเร็จ";
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        [HttpGet]
        public IActionResult Delete(int CommentId)
        {
            string msg = "";
            try
            {
                var Get = DB.Comments.Where(w => w.CommentId == CommentId).FirstOrDefault();
                DB.Comments.Remove(Get);
                DB.SaveChanges();
                msg = "ลบข้อมูลสำเร็จ";
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }
        
    }
}
