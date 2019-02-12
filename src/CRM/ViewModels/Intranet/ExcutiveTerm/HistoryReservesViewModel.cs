using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Intranet.ExcutiveTerm
{
    public class HistoryReservesViewModel
    {
        [Required]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Detail")]
        public string Detail { get; set; }

        [Required]
        [Display(Name = "CreateDate")]
        public string CreateDate { get; set; }

        [Required]
        [Display(Name = "PersonalCode")]
        public string PersonalCode { get; set; }


    }
}
