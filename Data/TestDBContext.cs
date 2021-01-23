using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.Data
{
    public class TestDBContext : DbContext
    {
        //public DbSet<User> User { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Options> Options { get; set; }
    }
}
