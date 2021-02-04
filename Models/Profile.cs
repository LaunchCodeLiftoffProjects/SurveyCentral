using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class Profile
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
      
        public string LastName { get; set; }

        public string SchoolName { get; set; }

        public string Emoji { get; set; }

        public Profile()
        {
        }

        public Profile(string firstName, string lastName, string schoolName, string emoji)
        {
            FirstName = firstName;
            LastName = lastName;
            SchoolName = schoolName;
            Emoji = emoji;
        }
    }
}
