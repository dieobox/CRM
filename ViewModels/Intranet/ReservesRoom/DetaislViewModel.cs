using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ReservesRoom
{
    public class DetailsViewModel
    {
        [Required]
        [Display(Name = "title")]
        public string title { get; set; }

        [Required]
        [Display(Name = "BookingByName")]
        public string BookingByName { get; set; }

        [Required]
        [Display(Name = "Orgname")]
        public string Orgname { get; set; }

        [Required]
        [Display(Name = "StartDate")]
        public string StartDate { get; set; }

        [Required]
        [Display(Name = "EndDate")]
        public string EndDate { get; set; }

        [Required]
        [Display(Name = "RoomName")]
        public string RoomName { get; set; }
        
    }
}

