using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ReservesRoom
{
    public class DetailViewModel
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
        public int ReserveTypeId { get; set; }

        [Display(Name = "IsEveryDay")]
        public int IsEveryDay { get; set; }
        

        [Required]
        [Display(Name = "IsEveryWeek")]
        public int IsEveryWeek { get; set; }

        [Required]
        [Display(Name = "CommentCancel")]
        public string CommentCancel { get; set; }

        [Required]
        [Display(Name = "CreateBy")]
        public string CreateBy { get; set; }

        [Required]
        [Display(Name = "CancelId")]
        public int CancelId { get; set; }

        [Required]
        [Display(Name = "BudgetYear")]
        public int BudgetYear { get; set; }

        [Required]
        [Display(Name = "RoomName")]
        public string RoomName { get; set; }

    }
}

