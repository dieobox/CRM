using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.TimeAttdence
{
    public class OrgTimeAttenReport
    {
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Display(Name = "Period 1")]
        public int Period_1 { get; set; }

        [Display(Name = "Period 2")]
        public int Period_2 { get; set; }

        [Display(Name = "Period 3")]
        public int Period_3 { get; set; }

        [Display(Name = "Late")]
        public int Late { get; set; }

        [Display(Name = "HalfAbsence")]
        public int HalfAbsence { get; set; }

        [Display(Name = "Absence")]
        public double Absence { get; set; }
    }
}
