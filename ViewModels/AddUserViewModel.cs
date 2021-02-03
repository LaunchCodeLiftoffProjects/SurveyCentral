using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TestCentral.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TestCentral.ViewModels
{
    public class AddUserViewModel
    {
       [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }

        public string SchoolName { get; set; }
        public string Emoji { get; set;  }
    }
}
