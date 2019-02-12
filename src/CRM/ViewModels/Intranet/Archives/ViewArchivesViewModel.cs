using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Archives
{
    public class ViewArchivesViewModel
    {
        [Display(Name = "ID")]
        public int ID { get; set; }

        [Required]
        [Display(Name = "CreateByPCode")]
        public string CreateByPCode { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public string CreateDate { get; set; }

        [Required]
        [Display(Name = "TypeName")]
        public string TypeName { get; set; }

        [Required]
        [Display(Name = "AccessLevelName")]
        public string AccessLevelName { get; set; }

        [Required]
        [Display(Name = "ExpeditionName")]
        public string ExpeditionName { get; set; }

        [Display(Name = "Year")]
        public string  Year { get; set; }

        [Display(Name = "RegisterDate")]
        public string RegisterDate { get; set; }

        [Display(Name = "ArchiveNumber")]
        public string ArchiveNumber { get; set; }

        [Display(Name = "Dear")]
        public string Dear { get; set; }

        [Display(Name = "Title")]
        public string Title { get; set; }

        [Display(Name = "Message")]
        public string Message { get; set; }

        [Display(Name = "ExternalOrgName")]
        public string ExternalOrgName { get; set; }

        [Display(Name = "AttachFiles")]
        public string AttachFiles { get; set; }

        [Display(Name = "ExternalArchiveNumber")]
        public string ExternalArchiveNumber { get; set; }

        public string TypeCode { get; set; }

        public string DateOfdoc { get; set; }
    }
}
