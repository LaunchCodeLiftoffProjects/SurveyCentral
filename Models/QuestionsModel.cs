using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class Questions
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public int UserId { get; set; }
        public string Prompt { get; set; }
        public string ImgRelatedToPrompt { get; set; }
        public string Type { get; set; }
        public string Answer { get; set; }


        public Questions() 
        {

        }
    }
}
