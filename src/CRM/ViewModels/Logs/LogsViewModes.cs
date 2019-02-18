using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CRM.ViewModels.Logs
{
    public class LogsViewModes
    {
        public string UserId { get; set; }
        public string Img { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string ActionDate { get; set; }
        public string TimeAgo { get; set; }
    }
}
