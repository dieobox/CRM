using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Archives
{
    public class RountTransectionViewModel
    {
        [Display(Name = "Status")]
        public string Status { get; set; }

        [Display(Name = "OrgShortName")]
        public string OrgShortName { get; set; }

        [Display(Name = "OrgtName")]
        public string OrgtName { get; set; }

        [Display(Name = "StatusId")]
        public int StatusId { get; set; }
    }
}
