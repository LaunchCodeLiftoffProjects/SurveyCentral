using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class TestUser: IdentityUser
    {   [PersonalData]
        public string FirstName { get; set; }
        [PersonalData]
        public string LastName { get; set; }
        [PersonalData]
        public string SchoolName { get; set; }
        [PersonalData]
        public string Emoji { get; set; }

        public TestUser()
        { 
        }

        public TestUser(string firstName, string lastName, string schoolName, string emoji)
        {
            FirstName = firstName;
            LastName = lastName;
            SchoolName = schoolName;
            Emoji = emoji;
        }

    }
}
