using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Archives
{
    public class ArchivesViewModel
    {
        [Display(Name = "ID")]
        public int ID { get; set; }

        [Required]
        [Display(Name = "ArchiveNumber")]
        public string ArchiveNumber { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public string CreateDate { get; set; }

        [Required]
        [Display(Name = "FromOrg")]
        public string FromOrg { get; set; }

        [Required]
        [Display(Name = "ToOrg")]
        public string ToOrg { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }
        
        [Display(Name = "StatusCode")]
        public string StatusCode { get; set; }

        [Display(Name = "BudgetYear")]
        public int BudgetYear { get; set; }

        [Display(Name = "ReceiveArchive")]
        public int ReceiveArchive { get; set; }

        [Display(Name = "Prefix")]
        public string Prefix { get; set; }
    }
}
