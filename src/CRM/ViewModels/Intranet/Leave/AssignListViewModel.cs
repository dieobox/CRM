﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Intranet.Leave
{
    public class AssignListViewModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string AssignDate { get; set; }
    }
}
