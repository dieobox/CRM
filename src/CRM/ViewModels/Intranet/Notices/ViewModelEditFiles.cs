using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Notices
{
    public class ViewModelEditFiles
    {
        [Required]
        [Display(Name = "FileName")]
        public string FileName { get; set; }

        [Required]
        [Display(Name = "FileTitle")]
        public string FileTitle { get; set; }
    }
}
