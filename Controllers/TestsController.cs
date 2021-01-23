using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Data;
using TestCentral.Models;

namespace TestCentral.Controllers
{
    public class TestsController : Controller
    {
        private TestDBContext context;
        public TestsController(TestDBContext dbContext)
        {
            context = dbContext;
        }

        public IActionResult Index()
        {
            List<Test> tests = context.Tests.ToList();

            return View(tests);
        }

        public IActionResult Add()
        {
            return View();
        }
    }
}
