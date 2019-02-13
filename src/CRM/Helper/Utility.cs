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

namespace CRM.Helpers
{
    public class Utility

    {
        private readonly ILogger _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext DB;
        private IHostingEnvironment _environment;


        public Utility(
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
            _logger = loggerFactory.CreateLogger<Utility>();

        }

        public Utility(SignInManager<ApplicationUser> signInManager, ApplicationDbContext dbContext)
        {
            DB = dbContext;
        }

        public string getMonth(int month)
        {
            string[] MonthName = { "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" };
            return MonthName[month - 1];
        }

        public string getMonthShort(int month)
        {
            string[] MonthName = { "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." };
            return MonthName[month - 1];
        }

        public string getShortDate(DateTime DateCheck)
        {
            string month = getMonthShort(DateCheck.Month);
            int Year = DateCheck.Year + 543;
            return DateCheck.ToString("dd ") + month + " " + Year.ToString();
        }

        public string getShortDateAndTime(DateTime DateCheck)
        {
            string month = getMonthShort(DateCheck.Month);
            int Year = DateCheck.Year + 543;
            return DateCheck.ToString("dd ") + month + " " + Year.ToString() + DateCheck.ToString(" H:mm");
        }

        public string getFullDateAndTime(DateTime DateCheck)
        {
            string month = getMonth(DateCheck.Month);
            int Year = DateCheck.Year + 543;
            return DateCheck.ToString("dd ") + month + " " + Year.ToString() + DateCheck.ToString(" H:mm") + " น.";
        }

        public string getFullDate(DateTime DateCheck)
        {
            string month = getMonth(DateCheck.Month);
            int Year = DateCheck.Year + 543;
            return DateCheck.ToString("dd ") + month + " " + Year.ToString();
        }

        public int getYearTH(DateTime DateCheck)
        {
            int Year = DateCheck.Year + 543;
            return Year;
        }

        public string TimeAgo(DateTime DateCheck)
        {
            string result = string.Empty;
            var timeSpan = DateTime.Now.Subtract(DateCheck);

            if (timeSpan <= TimeSpan.FromSeconds(60))
            {
                result = string.Format("{0} วินาที", timeSpan.Seconds);
            }
            else if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = timeSpan.Minutes > 1 ?
                    String.Format("{0} นาที", timeSpan.Minutes) :
                    "ประมาณ 1 นาทีที่แล้ว";
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = timeSpan.Hours > 1 ?
                    String.Format("{0} ชั่วโมง", timeSpan.Hours) :
                    "ประมาณ 1 ชั่วโมงที่แล้ว";
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = timeSpan.Days > 1 ?
                    String.Format("{0} วัน", timeSpan.Days) :
                    "เมื่อวาน";
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = timeSpan.Days > 30 ?
                    String.Format("{0} เดือน", timeSpan.Days / 30) :
                    "ประมาณ 1 เดือนที่แล้ว";
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    String.Format("{0} ปี", timeSpan.Days / 365) :
                    "ประมาณ 1 ปีที่แล้ว";
            }

            return result;
        }
        
    }
}