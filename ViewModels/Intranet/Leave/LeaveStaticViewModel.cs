using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class LeaveStaticViewModel 
    {
        public string LeaveTypeName { get; set; }
        public int PerBudgetYear { get; set; }
        public decimal Used { get; set; }
        public decimal Balance { get; set; }
    }
}
