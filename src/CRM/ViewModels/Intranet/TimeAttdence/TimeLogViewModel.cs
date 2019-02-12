using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.TimeAttdence
{
    public class TimeLogViewModel
    {
        [Display(Name = "TimeIn")]
        public string TimeIn { get; set; }

        [Display(Name = "TimeOut")]
        public string TimeOut { get; set; }

        [Display(Name = "Period")]
        public string Period { get; set; }
    }
}
