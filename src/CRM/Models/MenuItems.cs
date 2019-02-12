using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Models
{
    public class MenuItems
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MenuItemId { get; set; }
        [MaxLength(50)]
        public string MenuItemName { get; set; }
        [ForeignKey("Menus")]
        public int MenuId { get; set; }
        public bool MenuType { get; set; }
        [MaxLength(50)]
        public string Controller { get; set; }
        [MaxLength(50)]
        public string Action { get; set; }
        [MaxLength(50)]
        public string Url { get; set; }
        public int ParentId { get; set; }
        public int Position { get; set; }
        [MaxLength(20)]
        public string Icon { get; set; }
        public bool Enable { get; set; }

        public virtual Menus Menus { get; set; }
        public virtual ICollection<RoleMenus> RoleMenus { get; set; }
    }
}
