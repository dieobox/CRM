using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DEPIntranet.ViewModels.Announce
{
    public class GetViewModel
    {
        [Display(Name = "AnnounceId")]
        public int AnnounceId { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Display(Name = "CreateDate")]
        public string CreateDate { get; set; }

        [Display(Name = "TimeAgo")]
        public string TimeAgo { get; set; }

        [Display(Name = "Details")]
        public string Details { get; set; }

        [Display(Name = "DateTimeNow")]
        public DateTime DateTimeNow { get; set; }

        [Display(Name = "AttachFile")]
        public string AttachFile { get; set; }


    }
}