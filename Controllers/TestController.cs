using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        
        /*
        [HttpPost]
        public IActionResult ViewTest(int testId) //Not sure of the view yet, but wanted to get this in place
        {
            Test test = context.Tests.Find(testId);

            return View(Index); //hasn't been fully built yet, currently built on index, could be test instead
        }
        */

        [HttpPost]
        public IActionResult Delete(int testId) // this could be an array to delete multiple tests
        {
            Test theTest = context.Tests.Find(testId);
            context.Tests.Remove(theTest);
            context.SaveChanges();

            return Redirect("/Index");
        }

        
        [HttpPost]
        public IActionResult UpdateTest(EditTestViewModel editTest, int testId) //Trying to figure out how to get it to allow update and loading all the info
        {
            Test test = context.Tests.Find(testId);

            List<Question> questions = context.Questions
                .Where(q => q.TestId == testId)
                .Include(q => q.Options)
                .ToList();


            EditTestViewModel editViewModel = new EditTestViewModel(Test test); 
            
            return View("Edit", editViewModel); 
        }
        
    }
    
}
