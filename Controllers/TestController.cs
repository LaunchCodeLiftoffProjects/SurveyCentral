using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
        public IActionResult ProcessAddTestForm([FromBody] AddTestViewModel addTestViewModel)
        {
            if (ModelState.IsValid)
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

                foreach (Question question in addTestViewModel.Questions)
                {
                    Question newQuestion = new Question
                    {
                        TestId = newTest.Id,
                        Prompt = question.Prompt,
                        Type = question.Type,
                        Answer = question.Answer,
                        ImgRelatedToPrompt = question.ImgRelatedToPrompt
                    };

                    context.Questions.Add(newQuestion);
                    context.SaveChanges();

                    if (question.Options != null)
                    {

                        foreach (Option option in question.Options)
                        {
                            Option newOption = new Option
                            {
                                QuestionId = newQuestion.Id,
                                Value = option.Value,
                                Label = option.Label
                            };
                            context.Options.Add(newOption);
                            context.SaveChanges();
                        }
                    }

                }
                return Redirect("/Test/Details/" + newTest.Id);
            }
            return View("Add", addTestViewModel);
        }


        [HttpGet]
        [Route("/Test/Details/{testId?}")]
        public IActionResult Details(int testId)
        {

            Test t = context.Tests
                .Where(t => t.Id == testId)
                .Include(t => t.Questions)
                .FirstOrDefault();

            int loopRunTimes = 0;
            foreach (Question q in t.Questions)
            {
                if (q.Type == "Multiple Choice")
                {
                    List<Option> o = context.Options
                        .Where(o => o.QuestionId == q.Id)
                        .ToList();
                    q.Options = o;
                }
                loopRunTimes++;
            }

            return View("Details", t);
        }


        [HttpGet]
        public IActionResult Delete(int testId)
        {
            Test theTest = context.Tests.Find(testId);
            context.Tests.Remove(theTest);
            context.SaveChanges();

            return Redirect("/Test");
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
        [Route("/Test/UpdateTest/{testId}")]
        public IActionResult UpdateTest(EditTestViewModel editTest, int testId)
        {
            Test test = context.Tests
                .Include(t => t.Questions)
                .ThenInclude(q => q.Options)
                .Single(t => t.Id == testId);

            if (test == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                test.Description = editTest.Description;
                test.NameOfTest = editTest.NameOfTest;
                test.UpdatedAt = DateTime.Now;

                foreach (Question question in editTest.Questions)
                {
                    Question existingQuestion = context.Questions.SingleOrDefault(q => q.Id == question.Id);

                    existingQuestion.Prompt = question.Prompt;
                    existingQuestion.ImgRelatedToPrompt = question.ImgRelatedToPrompt;
                    existingQuestion.Answer = question.Answer;

                    if (question.Options != null)
                    {
                        foreach (Option option in question.Options)
                        {
                            Option existingOption = context.Options.SingleOrDefault(o => o.Id == option.Id);
                            existingOption.Label = option.Label;
                        }
                    }
                }


                context.SaveChanges();
                return Redirect("/Test/Details/" + test.Id);
            }



            return View("/Index");
        }

    }

}
