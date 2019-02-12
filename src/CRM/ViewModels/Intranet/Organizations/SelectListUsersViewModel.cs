using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Organizations
{
    public class SelectListUsersViewModel
    {
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "Selected")]
        public string Selected { get; set; }

    }
}
