using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.TimeAttdence
{
    public class ReportTimeLogViewModel
    {
        [Display (Name ="Date")]
        public string Date { get; set; }

        [Display(Name = "TimeIn")]
        public string TimeIn { get; set; }

        [Display(Name ="LocalMachienTI")]
        public string LocalMachienTI { get; set; }

        [Display(Name = "LocalMachienTO")]
        public string LocalMachienTO { get; set; }

        [Display(Name = "TimeOut")]
        public string TimeOut { get; set; }

        [Display(Name = "Period")]
        public string Period { get; set; }

        [Display(Name = "Color")]
        public string Color { get; set; }
    }
}
