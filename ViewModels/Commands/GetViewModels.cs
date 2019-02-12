using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Commands
{
    public class GetViewModels
    {
        public int CId { get; set; }
        public string Title { get; set; }
        public string By { get; set; }
        public string Date { get; set; }
    }
}
