using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace CRM.ViewModels.UsersManagement
{
    public class ProfileViewModel
    {
        [Display(Name = "Fullname")]
        public string Fullname { get; set; }

        [Required]
        [Display(Name = "OrganizationName")]
        public string OrganizationName { get; set; }

        [Required]
        [Display(Name = "Position")]
        public string Position { get; set; }

        [Required]
        [Display(Name = "PictureProfile")]
        public string PictureProfile { get; set; }

        [Required]
        [Display(Name = "PersonalCode")]
        public string PersonalCode { get; set; }

    }
}
