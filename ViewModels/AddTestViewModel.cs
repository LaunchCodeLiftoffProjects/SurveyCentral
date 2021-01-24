﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.ViewModels
{
    public class AddTestViewModel
    {
        [Required]
        public string NameOfTest { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<Question> Questions { get; set; }
    }
}