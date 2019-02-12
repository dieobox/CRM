using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Home
{
    public class LeaveStatusViewModel 
    {
        public string StatusName { get; set; }
        public int  Count { get; set; }
    }
}
