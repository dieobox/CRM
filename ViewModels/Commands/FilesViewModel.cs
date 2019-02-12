using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace DEPIntranet.ViewModels.Commands
{
    public class FilesViewModel
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
