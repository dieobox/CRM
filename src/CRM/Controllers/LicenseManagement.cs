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
using Microsoft.AspNetCore.Mvc.Rendering;

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
        public CRM.Helpers.Utility Helper;

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
            var ViewModel = new List<GetLicenseViewModels>();
            var Customer = DB.Customers;
            var LicensePlate = DB.Licenses_Plant;
            foreach (var Get in DB.Licenses.Where(w=>w.CustomerId == CustomerId))
            {
                var Model = new GetLicenseViewModels();
                Model.Customername = Customer.Where(w => w.CustomerId == Get.CustomerId).Select(s=>s.CompanyName).FirstOrDefault();
                Model.ClientsLimit = Get.ClientsLimit;
                Model.ConsoleLimit = Get.ConsoleLimit;
                Model.LicenseId = Get.LicenseId;
                Model.LicensePlan = LicensePlate.Where(w => w.LicensePlantNumber == Get.LicensePlan).Select(s => s.LicensePlantName).FirstOrDefault();
                Model.Amount = Math.Round(Math.Abs((Get.ExpireDate - DateTime.Now).TotalDays));
                Model.StartDate = Helper.getShortDate(Get.StartDate);
                Model.ExpireDate = Helper.getShortDate(Get.ExpireDate);
                ViewModel.Add(Model);
            }
            
            return PartialView("Gets", ViewModel);
        }

        [HttpGet]
        public IActionResult FormAdd(string CustomerId)
        {
            ViewBag.CustomerId = CustomerId;
            ViewBag.ProductId = CheckProductId();
            ViewBag.LicensePlant = new SelectList(DB.Licenses_Plant.ToList(), "LicensePlantNumber", "LicensePlantName");
            return PartialView("FormAdd");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Add(Licenses Model, int StartDay, int StartMonth, int StartYear, int ExDay, int ExMonth, int ExYear)
        {
            string msg = "";
            try
            {
                Model.StartDate = new DateTime(StartYear, StartMonth, StartDay);
                Model.ExpireDate = new DateTime(ExYear, ExMonth, ExDay);
                Model.ActivatedDate = null;
                DB.Licenses.Add(Model);
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
        public IActionResult FormEdit(int LicenseId)
        {
            
            var Get = DB.Licenses.Where(w => w.LicenseId == LicenseId).FirstOrDefault();
            ViewBag.LicensePlant = new SelectList(DB.Licenses_Plant.ToList(), "LicensePlantNumber", "LicensePlantName", Get.LicensePlan);
            return PartialView("FormEdit", Get);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Licenses Model, int StartDay, int StartMonth, int StartYear, int ExDay, int ExMonth, int ExYear)
        {
            string msg = "";
            try
            {
                Model.StartDate = new DateTime(StartYear, StartMonth, StartDay);
                Model.ExpireDate = new DateTime(ExYear, ExMonth, ExDay);
                DB.Licenses.Update(Model);
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
        public async Task<IActionResult>  Delete(int LicenseId, string Password)
        {
            var CurrentUser = await _userManager.FindByIdAsync(_userManager.GetUserId(User));
            string msg = "";
            try
            {
                string PasswordCheck = "tnS12345P@ssw0rd!!";
                if (PasswordCheck != Password)
                {
                    return Json(new { valid = false, message = "รหัสผ่านไม่ถูกต้อง" });
                }

                var Get = DB.Licenses.Where(w => w.LicenseId == LicenseId).FirstOrDefault();
                DB.Licenses.Remove(Get);
                DB.SaveChanges();
                Logs(CurrentUser.Id);
                msg = "บันทึกสำเร็จ";
            }
            catch (Exception error)
            {
                msg = "Error is : " + error.Message;
                return Json(new { valid = false, message = msg });
            }
            return Json(new { valid = true, message = msg });
        }

        // helper
        public string GetnerateProductId()
        {
            string ProductId = "";
            Random Generator = new Random();
            string Digit = "D4";
            int Start = 1;
            int End = 10000;

            string SetA = Generator.Next(Start, End).ToString(Digit);
            string SetB = Generator.Next(Start, End).ToString(Digit);
            string SetC = Generator.Next(Start, End).ToString(Digit);
            string SetD = Generator.Next(Start, End).ToString(Digit);
            ProductId =  SetA + "-" + SetB + "-" + SetC + "-" + SetD;

            return ProductId;
        }

        public string CheckProductId()
        {
            string ProductId = "";
            string ProductIdCheck = GetnerateProductId();
            if (DB.Licenses.Where(w=>w.ProductId == ProductIdCheck).Count() > 0)
            {
                ProductId = GetnerateProductId();
            }
            else
            {
                ProductId = ProductIdCheck;
            }
            return ProductId;
        }

        [HttpGet]
        public IActionResult GetDay(int Month, int Year)
        {
            string Msg = "";
            try
            {
                List<SelectListItem> _Ddays = new List<SelectListItem>();
                int Ddays = DateTime.DaysInMonth(Year, Month);
                for (int i = 1; i <= Ddays; i++)
                {
                    var DT = new DateTime(Year, Month, i);
                    if (DateTime.Now.Day == i)
                    {
                        _Ddays.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString(), Selected = true });
                    }
                    else
                    {
                        _Ddays.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString(), Selected = true });
                    }

                    ViewBag.Day = _Ddays;
                }
            }
            catch (Exception e)
            {
                Msg = "Error is :" + e.InnerException;
            }

            return Json(ViewBag.Day);
        }

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
