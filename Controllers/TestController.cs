using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Data;
using TestCentral.Models;
using TestCentral.ViewModels;

namespace TestCentral.Controllers
{
    public class TestController : Controller
    {
        private TestDBContext context;
        public TestController(TestDBContext dbContext)
        {
            context = dbContext;
        }

        public IActionResult Index()
        {
            List<Test> tests = context.Tests.ToList();

            return View(tests);
        }
        [HttpGet]
        public IActionResult Add()
        {
            AddTestViewModel addTestViewModel = new AddTestViewModel();
            return View(addTestViewModel);
        }

        [HttpPost]
        public IActionResult ProcessAddTestForm(AddTestViewModel addTestViewModel, List<Question> questions)
        {
            if(ModelState.IsValid)
            {
                Test newTest = new Test
                {
                    NameOfTest = addTestViewModel.NameOfTest,
                    Description = addTestViewModel.Description,
                    UpdatedAt = DateTime.Now,
                    CreatedAt = DateTime.Now             
                };

                context.Tests.Add(newTest);
                context.SaveChanges();

                foreach (Question question in questions)
                {
                    Question newQuestion = new Question {
                        TestId = newTest.Id,
                        Prompt = question.Prompt,
                        Type = question.Type,
                        Answer = question.Answer,
                        ImgRelatedToPrompt = question.ImgRelatedToPrompt
                    };

                    context.Questions.Add(newQuestion);                   
                }

                context.SaveChanges();
                return Redirect("/Test");
            }
            return View("Add", addTestViewModel);
        }

        public IActionResult ViewTest(int id) //Not sure of the view yet, but wanted to get this in place
        {
            Test test = context.Tests.Find(id);

            return View(test);
        }
    }
}
