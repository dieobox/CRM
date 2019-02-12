using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace CRM.ViewModels.Menus
{
    public class RoleMenuViewModel
    {
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "RoleId")]
        public string RoleId { get; set; }

        [Required]
        [Display(Name = "RoleName")]
        public string RoleName { get; set; }

        [Required]
        [Display(Name = "MenuItemId")]
        public int MenuItemId { get; set; }

        [Required]
        [Display(Name = "MenuItemName")]
        public string MenuItemName { get; set; }

        [Required]
        [Display(Name = "MenuType")]
        public bool MenuType { get; set; }

        [Required]
        [Display(Name = "ParentId")]
        public int ParentId { get; set; }

        [Required]
        [Display(Name = "Controller")]
        public string Controller { get; set; }

        [Required]
        [Display(Name = "Action")]
        public string Action { get; set; }

        [Required]
        [Display(Name = "Url")]
        public string Url { get; set; }

        [Required]
        [Display(Name = "Position")]
        public int Position { get; set; }

        [Required]
        [Display(Name = "Icon")]
        public string Icon { get; set; }

        [Required]
        [Display(Name = "RoleMenuRoleId")]
        public string RoleIdInRoleMenu { get; set; }


        [Required]
        [Display(Name = "RoleMenuMenuItemId")]
        public int MenuItemIdInRoleMenu { get; set; }

    }
}
