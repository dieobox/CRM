using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Notices
{
    public class NoticeViewModel
    {
        [Required]
        [Display(Name = "NoticeId")]
        public int NoticeId { get; set; }

        [Required]
        [Display(Name = "NoticeDate")]
        public DateTime NoticeDate { get; set; }

        [Required]
        [Display(Name = "NoticeTo")]
        public string NoticeTo { get; set; }

        [Required]
        [Display(Name = "NoticeName")]
        public string NoticeName { get; set; }

        [Required]
        [Display(Name = "OrgId")]
        public int OrgId { get; set; }

        [Required]
        [Display(Name = "NoticeDetail")]
        public string NoticeDetail { get; set; }

        [Display(Name = "NoticeComment")]
        public string NoticeComment { get; set; }

        [Display(Name = "DeleteStatus")]
        public bool DeleteStatus { get; set; }

        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Display(Name = "CreateDate")]
        public DateTime CreateDate { get; set; }

        [Display(Name = "UpdateBy")]
        public string UpdateBy { get; set; }

        [Display(Name = "UpdateDate")]
        public DateTime UpdateDate { get; set; }

    }
}
