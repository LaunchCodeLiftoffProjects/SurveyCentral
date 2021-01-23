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
        public int UserId { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Test()
        {

        }
    }
}
