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
    public class ProfileDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }

        public ProfileDbContext(DbContextOptions<ProfileDbContext> options) : base(options)
        {
        }
    }
}
