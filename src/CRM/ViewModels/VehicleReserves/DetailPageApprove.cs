using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DEPIntranet.ViewModels.VehicleReserves
{
    public class DetailPageApprove
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Destination { get; set; }

        public string FullName { get; set; }

        public string Status { get; set; }

        public string DateReserves { get; set; }

        public int StatusId { get; set; }

        public bool IsCancel { get; set; }

        public int ReserveStartMilesNumber { get; set; }

        public int ReserveEndMilesNumber { get; set; }

        public int IsFullDay { get; set; }

    }
}
