using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Archives
{
    public class ForwardViewModel
    {
        [Required]
        [Display(Name = "OrgName")]
        public string OrgName { get; set; }
    }
}
