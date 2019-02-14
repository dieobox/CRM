using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRM.Models
{
    public class Licenses
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LicenseId { get; set; }
        public string ProductId { get; set; }
        public string CustomerId { get; set; }
        public int ClientsLimit { get; set; }
        public int ConsoleLimit { get; set; }
        public int LicensePlan { get; set; }
        public string LicenseKey { get; set; }
        public string DealerName { get; set; }
        public string SaleName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public DateTime? ActivatedDate { get; set; }
        public bool IsKeyRequested { get; set; }
        public bool IsActivated { get; set; }
        public string IPAddress { get; set; }
        public string SystemId { get; set; }
    }
}
