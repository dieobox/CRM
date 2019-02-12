using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ReservesRoom
{
    public class DataViewModel
    {
        [Required]
        [Display(Name = "ReserveId")]
        public int  ReserveId { get; set; }

        [Required]
        [Display(Name = "ReserveUserName")]
        public string ReserveUserName { get; set; }

        [Required]
        [Display(Name = "ReserveUserPosition")]
        public string ReserveUserPosition { get; set; }

        [Required]
        [Display(Name = "ReserveUserOrgName")]
        public string ReserveUserOrgName { get; set; }

        [Required]
        [Display(Name = "ReserveUserPhone")]
        public string ReserveUserPhone { get; set; }

        [Required]
        [Display(Name = "ReservePassenger")]
        public int ReservePassenger { get; set; }
        
        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "ReserveDetail")]
        public string ReserveDetail { get; set; }
        
        [Required]
        [Display(Name = "ReserveStartdate")]
        public string ReserveStartdate { get; set; }

        [Required]
        [Display(Name = "ReserveEnddate")]
        public string ReserveEnddate { get; set; }

        [Required]
        [Display(Name = "Participant")]
        public int Participant { get; set; }

        [Display(Name = "ReserveStatusName")]
        public string ReserveStatusName { get; set; }

        [Display(Name = "ReserveApproveBy")]
        public string ReserveApproveBy { get; set; }

        [Required]
        [Display(Name = "ReserveApproveDate")]
        public string ReserveApproveDate { get; set; }

        [Required]
        [Display(Name = "ReserveTypeId")]
        public string ReserveTypeId { get; set; }

        [Display(Name = "IsReserveDayOrWeek")]
        public string IsReserveDayOrWeek { get; set; }


        [Required]
        [Display(Name = "IsEveryWeek")]
        public bool IsEveryWeek { get; set; }
        [Required]
        [Display(Name = "IsEveryWeek")]
        public bool IsEveryDay { get; set; }

        [Required]
        [Display(Name = "CommentCancel")]
        public string CommentCancel { get; set; }

        [Required]
        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Required]
        [Display(Name = "Day")]
        public string Day { get; set; }
        

        [Required]
        [Display(Name = "BudgetYear")]
        public int BudgetYear { get; set; }

        [Required]
        [Display(Name = "RoomName")]
        public string RoomName { get; set; }

        [Required]
        [Display(Name = "ReserveStatusId")]
        public int ReserveStatusId { get; set; }

        [Required]
        [Display(Name = "IsCancel")]
        public bool IsCancel { get; set; }

        [Required]
        [Display(Name = "RoomId")]
        public int RoomId { get; set; }

        [Required]
        [Display(Name = "CancelId")]
        public int CancelId { get; set; }

        // New By Bomb
        [Required]
        [Display(Name = "StartDate")]
        public DateTime StartDate { get; set; }

        [Required]
        [Display(Name = "EndDate")]
        public DateTime EndDate { get; set; }
    }
}

