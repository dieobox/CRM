using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DEPIntranet.ViewModels.Organizations
{
    public class UserViewModel
    {
        [Display(Name = "OrgUserId")]
        public int OrgUserId { get; set; }

        [Required]
        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "LastName")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "OrgHead")]
        public bool OrgHead { get; set; }

    }
}
