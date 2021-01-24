using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TestCentral.Models
{
    public class AppRole : IdentityRole<int>
    {
        public AppRole() { }
        public AppRole(string name)
        {
            Name = name;
        }
    }  
}
