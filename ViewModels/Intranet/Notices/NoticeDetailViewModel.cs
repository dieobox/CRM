using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Notices
{
    public class NoticeDetailViewModel
    {

        [Required]
        [Display(Name = "NoticeName")]
        public string NoticeName { get; set; }

        [Required]
        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Required]
        [Display(Name = "NoticeDetail")]
        public string NoticeDetail { get; set; }

        [Required]
        [Display(Name = "NoticeDate")]
        public string NoticeDate { get; set; }
    }
}
