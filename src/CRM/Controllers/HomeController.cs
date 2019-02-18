using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using CRM.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CRM.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using CRM.ViewModels.Home;
using CRM.ViewModels.Logs;

namespace CRM.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;
        public CRM.Helpers.Utility Helper;

        public HomeController(
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
        public async Task<IActionResult>  Index()
        {
            var CurrentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
            if (DB.Logs.Where(w=>w.ActionDate.Year == DateTime.Now.Year && w.ActionDate.Month == DateTime.Now.Month && w.ActionDate.Day == DateTime.Now.Day && w.UserId == CurrentUser.Id).Count() == 0)
            {
                Logs(CurrentUser.Id);
            }
            
            return View();
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            ViewBag.DateTimeNow = Helper.getFullDateAndTime(DateTime.Now);
            var Gets = DB.Customers;
            return PartialView("GetCustomers", Gets);
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var Gets = DB.Users;
            return PartialView("GetUsers", Gets);
        }

        [HttpGet]
        public IActionResult BestSellerProduct()
        {
            ViewBag.DateTimeNow = Helper.getFullDateAndTime(DateTime.Now);
            var ViewModels = new List<BestSellerViewModels>();
            var Gets = DB.Licenses_Plant;
            var License = DB.Licenses;
            foreach (var Get in Gets)
            {
                var Model = new BestSellerViewModels();
                Model.Id = Get.LicensePlantId;
                Model.Name = Get.LicensePlantName;
                Model.Amount = License.Where(w => w.LicensePlan == Convert.ToInt32(Get.LicensePlantNumber)).Count();
                ViewModels.Add(Model);
            }

            return PartialView("BestSellerProduct", ViewModels);
        }

        [HttpGet]
        public IActionResult LogsView()
        {
            var User = DB.Users;
            var ViewModels = new List<LogsViewModes>();
            var Gets = DB.Logs.Take(5).OrderByDescending(o=>o.LogId).ToList();
            foreach (var Get in Gets)
            {
                var Model = new LogsViewModes();
                Model.UserId = User.Where(w => w.Id == Get.UserId).Select(s => s.FirstName + " " + s.LastName).FirstOrDefault();
                Model.Img = User.Where(w => w.Id == Get.UserId).Select(s => s.PictureFile).FirstOrDefault();
                Model.Controller = Get.Controllers;
                Model.Action = Get.Action;
                Model.ActionDate = Helper.getShortDate(Get.ActionDate);
                Model.TimeAgo = Helper.TimeAgo(Get.ActionDate);
                ViewModels.Add(Model);
            }
            return PartialView("LogsView", ViewModels);
        }

        [HttpGet]
        public IActionResult Logs(string UserId)
        {
            var GetLog = new Logs();
            GetLog.UserId = UserId;
            GetLog.Controllers = RouteData.Values["controller"].ToString();
            GetLog.Action = RouteData.Values["action"].ToString();
            GetLog.IP = HttpContext.Connection.RemoteIpAddress.ToString();
            GetLog.ActionDate = DateTime.Now;
            DB.Logs.Add(GetLog);
            DB.SaveChanges();
            return null;
        }
    }
}
