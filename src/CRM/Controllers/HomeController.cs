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
        public IActionResult Index()
        {
            
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
                Model.Amount = License.Where(w => w.LicensePlan == Get.LicensePlantNumber).Count();
                ViewModels.Add(Model);
            }

            return PartialView("BestSellerProduct", ViewModels);
        }
    }
}
