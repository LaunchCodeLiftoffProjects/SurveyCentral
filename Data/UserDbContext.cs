using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace TestCentral.Data
{
    public class UserDbContext: IdentityDbContext<IdentityUser>
    {
        public new DbSet<AppUser> Users { get; set; }

        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
