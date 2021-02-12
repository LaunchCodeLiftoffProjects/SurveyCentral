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
        public IActionResult ProcessAddTestForm([FromBody]AddTestViewModel addTestViewModel, List<Question> questions, List<Option> options)
        {
            if(ModelState.IsValid)
            {
                Test newTest = new Test
                {
                    NameOfTest = addTestViewModel.NameOfTest,
                    Description = addTestViewModel.Description,
                    UpdatedAt = DateTime.Now,
                    CreatedAt = DateTime.Now,
                    Questions = addTestViewModel.Questions
                };

                context.Tests.Add(newTest);
                context.SaveChanges();

                foreach(Question question in questions)
                {
                    Question newQuestion = new Question {
                        TestId = newTest.Id,
                        Prompt = question.Prompt,
                        Type = question.Type,
                        Answer = question.Answer,
                        ImgRelatedToPrompt = question.ImgRelatedToPrompt,
                        Options = question.Options
                    };

                    context.Questions.Add(newQuestion);
                    context.SaveChanges();

                    if (newQuestion.Options != null)
                    {

                        foreach(Option option in options)
                        {
                            Option newOption = new Option
                            {
                                QuestionId = newQuestion.Id,
                                Value = option.Value,
                                Label = option.Label
                            };
                            context.Options.Add(newOption);
                        }
                    }
                    
                }

                context.SaveChanges();
                return Redirect("/Test/Details/" + newTest.Id);
            }
            return View("Add", addTestViewModel);
        }
        
        
        [HttpGet]
        [Route("/Test/Details/{testId?}")]
        public IActionResult Details(int testId) //Not sure of the view yet, but wanted to get this in place
        {
            Test theTest = context.Tests
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                .Single(t => t.Id == testId);


            return View(theTest); //hasn't been fully built yet, currently built on index, could be test instead
        }
        

        [HttpPost]
        public IActionResult Delete(int testId) // this could be an array to delete multiple tests
        {
            Test theTest = context.Tests.Find(testId);
            context.Tests.Remove(theTest);
            context.SaveChanges();

            return Redirect("/Index");
        }

        [HttpGet]
        [Route("/Test/UpdateTest/{testId?}")]
        public IActionResult UpdateTest(int testId)
        {
            Test theTest = context.Tests
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                .Single(t => t.Id == testId);

            return View(theTest);
            
        }
        
        [HttpPost]
        public IActionResult UpdateTest([FromBody]EditTestViewModel editTest) //Trying to figure out how to get it to allow update and loading all the info
        {
            Test test = context.Tests.Find(editTest.TestId); //find the old record

            
            if (ModelState.IsValid)
            {
                test.Description = editTest.Description;
                test.NameOfTest = editTest.NameOfTest;
                test.UpdatedAt = DateTime.Now;
                test.Questions = editTest.Questions;
                //test.Options = editTest.Options; // Not in the test model, so we'll need to load it

                context.Update(test);
                //context.SaveChanges();
            }

            
            
            return View("/Index"); 
        }
        
    }
    
}
