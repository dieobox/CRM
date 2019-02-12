using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class CumulativeViewModel 
    {
        [Display(Name = "LeaveRelaxId")]
        public int LeaveRelaxId { get; set; }

        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Display(Name = "TypeName")]
        public string TypeName { get; set; }

        [Display(Name = "Experience")]
        public string Experience { get; set; }

        // ยอดตั้งต้น
        [Display(Name = "Start")]
        public decimal Start { get; set; }

        // สิทธิ์ต่อปี
        [Display(Name = "PerYear")]
        public decimal PerYear { get; set; }

        //ยอดยกมา
        [Display(Name = "Summit")]
        public decimal Summit { get; set; }
        
        //คงเหลือ
        [Display(Name = "Balance")]
        public decimal Balance { get; set; }

        [Display(Name = "PersonalCode")]
        public string PersonalCode { get; set; }
    }
}
