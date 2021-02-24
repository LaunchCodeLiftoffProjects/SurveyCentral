using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.ViewModels
{
    public class EditTestViewModel
    {
        public int Id { get;}
        [Required(ErrorMessage = "Test name is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Test name must be between 3 and 50 characters")]
        public string NameOfTest { get; set; }
        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description too long!")]
        public string Description { get; set; }


        // I think we need to store the Id for the Prompt and Answers
        public List<Question> Questions { get; set; }
        public List<Option> Options { get; set; }



        public EditTestViewModel(List<Question> questions, List<Option> options) //need to get the options and questions loaded too
        {
            Questions = questions;
            Options = options;
        }


        public EditTestViewModel() { }
    }
}
