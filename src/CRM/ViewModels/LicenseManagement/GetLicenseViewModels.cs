using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CRM.ViewModels.LicenseManagement
{
    public class GetLicenseViewModels  
    {
        public int LicenseId { get; set; }
        public string Customername { get; set; }
        public int ClientsLimit { get; set; }
        public int ConsoleLimit { get; set; }
        public int LicensePlan { get; set; }
        public int Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
