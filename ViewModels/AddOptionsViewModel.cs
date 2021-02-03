using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.ViewModels
{
    public class AddOptionsViewModel
    {
        public int QuestionId { get; set; }
        public int OptionsId { get; set; }
        public Question Question { get; set; }
        public List<Option> Options { get; set; }

        //So an option is a singular thing, but when we add options we will probably add many at
        //a time, so I figure we can pass it as a list for the viewmodel.
        public AddOptionsViewModel(Question theQuestion, List<Option> possibleOptions)
        {
            Options = new List<Option>();

            foreach( Option option in possibleOptions)
            {
                Options.Add(new Option
                {
                    Value = option.Value,
                    Label = option.Label
                });
            }

            Question = theQuestion;
        }

        public AddOptionsViewModel() { }
    }
}
