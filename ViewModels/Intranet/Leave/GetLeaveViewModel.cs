using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class GetLeaveViewModel
    {
        public int LeaveId { get; set; }
        public string PersonalCode { get; set; }
        public string LeaveTypeName { get; set; }
        public string FullName { get; set; }
        public string CreateDate { get; set; }
        public string LeaveDate { get; set; }
        public string LeaveNumber { get; set; }
        public string ApproveName { get; set; }
        public string StatusName { get; set; }
        public string Details { get; set; }
        public int TransactionId { get; set; }
        public string OrgName { get; set; }
        public int MyLevel { get; set; }

        public int CurrentLevel { get; set; }
        public int ApproveLevel { get; set; }
        public int LeaveStatusId { get; set; }

    }
}
