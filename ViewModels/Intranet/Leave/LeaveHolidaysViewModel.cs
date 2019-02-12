using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class LeaveHolidaysViewModel
    {
        [Display(Name = "HoliDayName")]
        public string HoliDayName { get; set; }

        [Display(Name = "HoliDayDate")]
        public string HoliDayDate { get; set; }

        [Display(Name = "LeaveHoliDayId")]
        public int LeaveHoliDayId { get; set; }

        [Display(Name = "Enable")]
        public bool Enable { get; set; }
    }
}
