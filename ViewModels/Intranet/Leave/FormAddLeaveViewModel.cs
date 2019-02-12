using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class FormAddLeaveViewModel  
    {
        public int LeaveTypeId { get; set; }
        public bool IsHalfDay { get; set; }
        public string Details { get; set; }
        public DateTime LeaveDate { get; set; }
    }
}
