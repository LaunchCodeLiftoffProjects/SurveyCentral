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
                        Prompt = questions.Prompt, //these are getting highlighted because it needs to be question instead of questions
                        Type = questions.Type,
                        Answer = questions.Answer,
                        ImgRelatedToPrompt = questions.ImgRelatedToPrompt
                    };

                    context.Questions.Add(newQuestion);
                    //do we need to save changes again?
                }
               
                return Redirect("/Test");
            }
            return View("Add", addTestViewModel);
        }
    }
}
