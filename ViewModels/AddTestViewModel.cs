using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.ViewModels
{
    public class AddTestViewModel
    {
        //[Required]
        [Required(ErrorMessage = "Test name is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Test name must be between 3 and 50 characters")]
        public string NameOfTest { get; set; }
        //[Required]
        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description too long!")]
        public string Description { get; set; } 
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // I think we need to store the Id for the Prompt and Answers
        public List<Question> Questions { get; set; }
        public List<Option> Options { get; set; }
        

        //Nathan
        public AddTestViewModel(List<Question> possibleQuestions, List<Option> possibleOptions)
        {
            Questions = new List<Question>();

            foreach(Question question in possibleQuestions)
            {
                Questions.Add(new Question
                {
                    //fill in stuff
                });
            }

            Options = new List<Option>();

            foreach (Option option in possibleOptions)
            {
                Options.Add(new Option
                {
                    //fill in stuff
                });
            }
        }

        public AddTestViewModel() { }
    }
}
