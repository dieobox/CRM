using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Notices
{
    public class ViewModelFormEditNotice
    {
        [Required]
        [Display(Name = "NoticeId")]
        public int NoticeId { get; set; }

        [Required]
        [Display(Name = "NoticeDate")]
        public DateTime NoticeDate { get; set; }

        [Required]
        [Display(Name = "NoticeName")]
        public string NoticeName { get; set; }

        [Required]
        [Display(Name = "NoticeDetail")]
        public string NoticeDetail { get; set; }

        [Required]
        [Display(Name = "NoticeType")]
        public string NoticeType { get; set; }

        [Required]
        [Display(Name = "ToPersonId")]
        public string ToPersonId { get; set; }

        [Required]
        [Display(Name = "OrgName")]
        public string OrgName { get; set; }

        [Required]
        [Display(Name = "FullName")]
        public string FullName { get; set; }
    }
}
