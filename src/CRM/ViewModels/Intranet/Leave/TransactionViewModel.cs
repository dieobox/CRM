using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class TransactionViewModel
    {
        public int CurrentLevel { get; set; }
        public string ArrivalDate { get; set; }
        public string Comment { get; set; }
        public string StatusName { get; set; }
        public int StatusId { get; set; }
        public string ApproveName { get; set; }
    }
}
