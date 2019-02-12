using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.VehicleReserves
{
    public class DetailViewModel
    {
        [Required]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [Display(Name = "ReserveUserPosition")]
        public string ReserveUserPosition { get; set; }

        [Required]
        [Display(Name = "OrgName")]
        public string OrgName { get; set; }

        [Required]
        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Destination")]
        public string Destination { get; set; }

        [Required]
        [Display(Name = "Detail")]
        public string Detail { get; set; }

        [Required]
        [Display(Name = "Passenger")]
        public int Passenger { get; set; }

        [Required]
        [Display(Name = "StartDate")]
        public string StartDate { get; set; }

        [Required]
        [Display(Name = "EndDate")]
        public string EndDate { get; set; }

        [Required]
        [Display(Name = "StatusId")]
        public int StatusId { get; set; }

        [Required]
        [Display(Name = "Status")]
        public string Status { get; set; }
        
        [Display(Name = "Mile")]
        public int Mile { get; set; }
        
        [Display(Name = "Vehicle")]
        public string Vehicle { get; set; }

        [Required]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [Required]
        [Display(Name = "IsCancel")]
        public bool IsCancel { get; set; }
        
        [Display(Name = "Comment")]
        public string Comment { get; set; }

        [Required]
        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }
        
        [Display(Name = "Driver")]
        public string Driver { get; set; }

        [Display(Name = "DriverPhone")]
        public string DriverPhone { get; set; }
    }
}
