using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class OptionsModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }


        public OptionsModel() { }

        public OptionsModel(string value, string label) 
        {
            Value = value;
            Label = label;
        }
    }
}
