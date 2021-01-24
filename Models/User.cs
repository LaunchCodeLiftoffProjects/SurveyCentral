using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class User
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SchoolName { get; set; }

        public string Emoji { get; set; }

        public User()
        { 
        }

        public User(string emailAddress, string password, string firstName, string lastName, string schoolName, string emoji)
        {
            EmailAddress = emailAddress;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            SchoolName = schoolName;
            Emoji = emoji;
        }

    }
}
