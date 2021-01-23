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

        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }

        //Setup constructor to extend base class construcotr (19.2 in textbook for reference)
        public TestDBContext(DbContextOptions<TestDBContext> options) : base(options)
        {

        }
    }
}
