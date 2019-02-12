using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ReservesRoom
{
    public class ListViewModel
    {
        [Required]
        [Display(Name = "ReservesDate")]
        public string ReservesDate { get; set; }

        [Required]
        [Display(Name = "Detail")]
        public string Detail { get; set; }

        [Required]
        [Display(Name = "PersonAmount")]
        public int PersonAmount { get; set; }

        [Required]
        [Display(Name = "Status")]
        public string Status { get; set; }

        [Required]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "StatusId")]
        public int StatusId { get; set; }

        [Required]
        [Display(Name = "RoomId")]
        public int RoomId { get; set; }

        [Required]
        [Display(Name = "RoomName")]
        public string RoomName { get; set; }

        [Display(Name = "IsCancel")]
        public bool IsCancel { get; set; }
    }
}
