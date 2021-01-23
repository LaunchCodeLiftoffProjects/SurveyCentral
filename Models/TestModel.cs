using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCentral.Models
{
    public class Test
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        
        //Placeholder until we have User object
        public User User { get; set; }

        public string NameOfTest { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Test()
        {

        }

        public Test(string nameOfTest, string description, bool status, DateTime createdAt, DateTime updatedAt)
        {
            NameOfTest = nameOfTest;
            Description = description;
            Status = status;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
        }
    }
}
