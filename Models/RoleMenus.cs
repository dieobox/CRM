using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Models
{
    public class RoleMenus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoleMenuId { get; set; }
        public string RoleId { get; set; }
        [ForeignKey("MenuItems")]
        public int MenuItemId { get; set; }

        public virtual MenuItems MenuItems { get; set; }
    }
}
