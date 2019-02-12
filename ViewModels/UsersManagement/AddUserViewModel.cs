using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace CRM.ViewModels.UsersManagement
{
    public class AddUserViewModel
    {
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "LastName")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "PictureFile")]
        public string PictureFile { get; set; }

        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 4)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [EmailAddress]
        [Remote("UserAlreadyExistsAsync", "Account", ErrorMessage = "User with this Email already exists")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Name = "OrgId")]
        public int OrgId { get; set; }

        [Required]
        [Display(Name = "PersonalCode")]
        public string PersonalCode { get; set; }

        [Required]
        [Display(Name = "BirthDate")]
        public DateTime BirthDate { get; set; }

        [Required]
        [Display(Name = "StartDate")]
        public DateTime StartDate { get; set; }

        [Required]
        [Display(Name = "RetireDate")]
        public DateTime RetireDate { get; set; }

        [Required]
        [Display(Name = "Status")]
        public int Status { get; set; }

        [Required]
        [Display(Name = "OrgCode")]
        public int OrgCode { get; set; }

        [Required]
        [Display(Name = "OrgName")]
        public string OrgName { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public DateTime CreateDate { get; set; }

        [Required]
        [Display(Name = "UpdateDate")]
        public DateTime UpdateDate { get; set; }

        [Required]
        [Display(Name = "Type")]
        public int Type { get; set; }

        [Required]
        [Display(Name = "TimeAttendanceUserId")]
        public int TimeAttendanceUserId { get; set; }

        [Required]
        [Display(Name = "PersoanlId")]
        public int PersoanlId { get; set; }

        [Required]
        [Display(Name = "IsOrgHead")]
        public bool IsOrgHead { get; set; }
    }
}
