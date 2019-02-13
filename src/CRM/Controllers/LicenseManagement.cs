using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using CRM.Models;
using CRM.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using CRM.ViewModels.LicenseManagement;

namespace CRM.Controllers
{
    [Authorize]
    public class LicenseManagement : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;

        public LicenseManagement(
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
        public IActionResult Index()
        {
            
            return View();
        }

        [HttpGet]
        public IActionResult Gets()
        {
            var ViewModel = new List<GetLicenseViewModels>();
            foreach (var Get in DB.Licenses)
            {
                var Model = new GetLicenseViewModels();
                Model.Customername = Get.CustomerId;
                Model.ClientsLimit = Get.ClientsLimit;
                Model.ConsoleLimit = Get.ConsoleLimit;
                Model.LicenseId = Get.LicenseId;
                Model.LicensePlan = Get.LicensePlan;
                Model.Amount = 15;
                Model.StartDate = DateTime.Now;
                Model.EndDate = DateTime.Now;
                ViewModel.Add(Model);
            }
            
            return PartialView("Gets", ViewModel);
        }
    }
}
