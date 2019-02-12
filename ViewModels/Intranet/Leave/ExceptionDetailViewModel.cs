using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class ExceptionDetailViewModel 
    {
        public string ExceptionDay { get; set; }
        public string TimeIn { get; set; }
        public string TimeOut { get; set; }
        public string Detail { get; set; }
    }
}
