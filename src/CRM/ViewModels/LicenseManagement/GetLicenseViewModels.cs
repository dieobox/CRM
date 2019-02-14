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
        public double Amount { get; set; }
        public string StartDate { get; set; }
        public string ExpireDate { get; set; }
    }
}
