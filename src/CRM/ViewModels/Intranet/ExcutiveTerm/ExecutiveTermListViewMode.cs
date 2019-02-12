using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ExcutiveTerm
{
    public class ExecutiveTermListViewModel
    {
        [Required]
        [Display(Name = "StoryName")]
        public string StoryName { get; set; }

        [Required]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "StartDate")]
        public string StartDate { get; set; }

        [Required]
        [Display(Name = "EndDate")]
        public string EndDate { get; set; }

        [Required]
        [Display(Name = "ManagerName")]
        public string ManagerName { get; set; }

        [Required]
        [Display(Name = "ReserveName")]
        public string ReserveName { get; set; }

        [Required]
        [Display(Name = "Detail")]
        public string Detail { get; set; }

        [Required]
        [Display(Name = "OrganizationReserves")]
        public string OrganizationReserves { get; set; }

        [Required]
        [Display(Name = "OrgName")]
        public string OrgName { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public string CreateDate { get; set; }

        [Required]
        [Display(Name = "PersonalReservesId")]
        public string PersonalReservesId { get; set; }

        [Required]
        [Display(Name = "Period")]
        public int Period { get; set; }

        [Required]
        [Display(Name = "CountChat")]
        public int CountChat { get; set; }


    }
}
