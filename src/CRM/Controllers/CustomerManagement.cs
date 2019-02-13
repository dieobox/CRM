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

namespace CRM.Controllers
{
    [Authorize]
    public class CustomerManagement : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;

        public CustomerManagement(
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
            var Get = DB.Customers;
            return PartialView("Gets", Get);
        }

        [HttpGet]
        public IActionResult FormAdd()
        {
            return PartialView("FormAdd");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Add(Customers Model)
        {
            string msg = "";
            try
            {
                Model.CustomerId = Guid.NewGuid().ToString("N");
                DB.Customers.Add(Model);
                DB.SaveChanges();
                msg = "บันทุกสำเร็จ";
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        [HttpGet]
        public IActionResult FormEdit(string CustomerId)
        {
            var Get = DB.Customers.Where(w => w.CustomerId == CustomerId).FirstOrDefault();
            return PartialView("FormEdit", Get);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Customers model)
        {
            string msg = "";
            try
            {
                DB.Customers.Update(model);
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
        public IActionResult DeleteCustomer(string CustomerId)
        {
            string msg = "";
            try
            {
                var Get = DB.Customers.Where(w => w.CustomerId == CustomerId).FirstOrDefault();
                DB.Remove(Get);
                DB.SaveChanges();
                msg = "ลบสำเร็จ";

            }
            catch (Exception e)
            {
                msg = "Error is : " + e.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }
    }
}
