﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class Options
    {
        public int Id { get; set; }
        public Questions Question { get; set; }
        public int QuestionId { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }


        public Options() { }

        public Options(string value, string label)
        {
            Value = value;
            Label = label;
        }

        
    }
}
