using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CRM.Models;

namespace CRM.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        public DbSet<Menus> Menus { get; set; }
        public DbSet<MenuItems> MenuItems { get; set; }
        public DbSet<RoleMenus> RoleMenus { get; set; }
        public DbSet<Licenses> Licenses { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Licenses_Plant> Licenses_Plant { get; set; }
        public DbSet<Logs> Logs { get; set; }
    }
}
