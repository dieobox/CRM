using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class DetailsViewModel 
    {
        public int LeaveTransactionId { get; set; }
        public string LeaveDate { get; set; }
        public string IsHalfDay { get; set; }
        public string IsHalfMorning { get; set; }
        public bool IsCancel { get; set; }
    }
}
