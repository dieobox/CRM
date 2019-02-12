using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DEPIntranet.ViewModels.Archives
{
    public class ReceiveArchivesViewModel
    {
        [Display(Name = "LastId")]
        public int LastId { get; set; }

        [Display(Name = "ReceiveNumber")]
        public int ReceiveNumber { get; set; }

        [Display(Name = "Comment")]
        public string Comment { get; set; }

        [Display(Name = "ReceiveByPCode")]
        public string ReceiveByPCode { get; set; }

        [Display(Name = "LastStatusCode")]
        public string LastStatusCode { get; set; }

        [Display(Name = "BeforeLastId")]
        public int BeforeLastId { get; set; }

        [Display(Name = "BeforeLastStatus")]
        public string BeforeLastStatus { get; set; }

        [Display(Name = "FromOrgCode")]
        public int FromOrgCode { get; set; }

        [Display(Name = "ToOrgCode")]
        public int ToOrgCode { get; set; }
    }
}
