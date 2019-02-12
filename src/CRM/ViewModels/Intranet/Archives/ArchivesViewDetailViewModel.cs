using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DEPIntranet.ViewModels.Archives
{
    public class ArchivesViewDetailViewModel
    {
        [Display(Name = "ReceiveNumber")]
        public int ReceiveNumber { get; set; }

        [Display(Name = "ToOrg")]
        public string ToOrg { get; set; }

        [Display(Name = "ReceiveBy")]
        public string ReceiveBy { get; set; }

        [Display(Name = "Comment")]
        public string Comment { get; set; }

        [Display(Name = "SendDate")]
        public string SendDate { get; set; }

        [Display(Name = "ReceiveDate")]
        public string ReceiveDate { get; set; }

        [Display(Name = "StatusCode")]
        public string StatusCode { get; set; }
    }
}
