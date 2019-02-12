using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DEPIntranet.ViewModels.VehicleReserves
{
    public class DetailViewModelCalendar
    {
        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "StartDate")]
        public string StartDate { get; set; }

        [Required]
        [Display(Name = "EndDate")]
        public string EndDate { get; set; }

        [Required]
        [Display(Name = "Destination")]
        public string Destination { get; set; }

        [Required]
        [Display(Name = "Passenger")]
        public int Passenger { get; set; }

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

        [Display(Name = "Driver")]
        public string Driver { get; set; }

        [Display(Name = "Vehicle")]
        public string Vehicle { get; set; }

        [Display(Name = "DriverPhone")]
        public string DriverPhone { get; set; }





     
    }
}

