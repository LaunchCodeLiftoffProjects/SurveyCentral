using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.ViewModels
{
    public class AddQuestionViewModel 
    {
        public string Type { get; set; } //would this be a select list item?

        [Required(ErrorMessage = "Prompt is required.")]
        [StringLength(250, MinimumLength = 4, ErrorMessage = "Question must be between 4 and 250 characters.")]
        public string Prompt { get; set; }
        
        public string ImgRelatedToPrompt { get; set; } //not required
        
        [Required]
        public List<Option> Options { get; set; }

        [Required(ErrorMessage = "Correct answer is required.")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Correct Answer must be between 1 and 50 characters.")]
        public string Answer { get; set; }

        public AddQuestionViewModel(Question question)
        {
            Type = question.Type;
            Prompt = question.Prompt;
            ImgRelatedToPrompt = question.ImgRelatedToPrompt;
            Options = question.Options;
        }

        public AddQuestionViewModel() { }
        

        

        
        

    }
}
