using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TestCentral.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TestCentral.ViewModels
{
    public class AddUserViewModel
    {
        [Required(ErrorMessage = "E-Mail address is required.")]
        [EmailAddress]
        public string EmailAddress {get; set;}
        
        [Required(ErrorMessage = "Password is required.")]
         public string Password { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }

        public string SchoolName { get; set; }
        public string Emoji { get; set;  }
    }
}
