using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CRM.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CRM.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;


namespace CRM.Controllers
{
    [Authorize]
    public class LicensePlantManagement : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;
        public CRM.Helpers.Utility Helper;

        public LicensePlantManagement(
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
        public IActionResult Gets()
        {
            var Gets = DB.Licenses_Plant;
            return PartialView("Gets", Gets);
        }

        [HttpGet]
        public IActionResult FormAdd()
        {
            return PartialView("FormAdd");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Add(Licenses_Plant Model)
        {
            string msg = "";
            try
            {
                if (DB.Licenses_Plant.Where(w => w.LicensePlantNumber == Model.LicensePlantNumber).Count() > 0)
                {
                    return Json(new { valid = false, message = "กรุณาตรวจสอบรหัสรุ่น" });
                }

                DB.Licenses_Plant.Add(Model);
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
        public IActionResult FormEdit(int LicensePlantId)
        {
            var Get = DB.Licenses_Plant.Where(w => w.LicensePlantId == LicensePlantId).FirstOrDefault();
            return PartialView("FormEdit", Get);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Licenses_Plant Model)
        {
            string msg = "";
            try
            {
                DB.Licenses_Plant.Update(Model);
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
        public IActionResult Delete(int LicensePlantId)
        {
            string msg = "";
            try
            {
                var Get = DB.Licenses_Plant.Where(w => w.LicensePlantId == LicensePlantId).FirstOrDefault();
                if (DB.Licenses.Where(w => w.LicensePlan == Convert.ToInt32(Get.LicensePlantNumber)).Count()>0)
                {
                    return Json(new { valid = false, message = "ไม่สามารถลบได้" });
                }

                DB.Licenses_Plant.Remove(Get);
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
