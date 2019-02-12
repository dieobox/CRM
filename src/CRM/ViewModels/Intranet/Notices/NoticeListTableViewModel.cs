using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Notices
{
    public class NoticeListTableViewModel
    {
        [Required]
        [Display(Name = "NoticeId")]
        public int NoticeId { get; set; }

        [Required]
        [Display(Name = "NoticeName")]
        public string NoticeName { get; set; }

        [Required]
        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Required]
        [Display(Name = "OrgId")]
        public string OrgId { get; set; }

        [Required]
        [Display(Name = "NoticeDate")]
        public string NoticeDate { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public DateTime CreateDate { get; set; }
    }
}
