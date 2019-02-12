using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.RoomReserves
{
    public class RoomReportViewModel
    {
        public string Title { get; set; }
        public string StatusName { get; set; }
        public string AppDate { get; set; }
        public string FullName { get; set; }
        public string OrgName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
