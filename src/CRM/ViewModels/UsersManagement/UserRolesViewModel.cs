using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace CRM.ViewModels.UsersManagement
{
    public class UserRolesViewModel
    {
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "RoleId")]
        public string RoleId { get; set; }

        [Required]
        [Display(Name = "RoleName")]
        public string RoleName { get; set; }

    }
}
