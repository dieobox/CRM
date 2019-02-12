using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Models
{
    public class Menus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MenuId { get; set; }
        [MaxLength(100)]
        public string MenuName { get; set; }
        public bool Enable { get; set; }

        public virtual ICollection<MenuItems> MenuItems { get; set; }
    }
}
