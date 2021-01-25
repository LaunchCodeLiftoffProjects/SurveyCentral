using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class Question
    {
        public int Id { get; set; }
        public Test Test { get; set; }
        public int TestId { get; set; }
        //placeholder until we have User objects
        //public User User { get; set; }
        public int UserId { get; set; }
        public string Prompt { get; set; }
        public string ImgRelatedToPrompt { get; set; }
        public string Type { get; set; }
        public string Answer { get; set; }
        
        //Do we need another prop for the List of options?
        public List<Option> Options { get; set; }

        


        public Question() 
        {

        }

        public Question(string prompt, string imgRelatedToPrompt, string type, string answer, List<Option> options)
        {
            Prompt = prompt;
            ImgRelatedToPrompt = imgRelatedToPrompt;
            Type = type;
            Answer = answer;
            Options = options;
        }
    }
}
