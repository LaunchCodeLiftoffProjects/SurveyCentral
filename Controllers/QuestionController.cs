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
    public class QuestionController : Controller
    {
        private TestDBContext context;

        public QuestionController(TestDBContext dbContext)
        {
            context = dbContext;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            List<Question> questions = context.Questions.ToList();

            return View(questions);
        }

        public IActionResult Add()
        {
            AddQuestionViewModel addQuestionViewModel = new AddQuestionViewModel();
            return View(addQuestionViewModel);
        }

        [HttpPost]
        public IActionResult ProcessAddQuestionForm(AddQuestionViewModel addQuestionViewModel)
        {
            if (ModelState.IsValid)
            {
                Question newQuestion = new Question
                {
                    Prompt = addQuestionViewModel.Prompt,
                    ImgRelatedToPrompt = addQuestionViewModel.ImgRelatedToPrompt,
                    Type = addQuestionViewModel.Type,
                    Answer = addQuestionViewModel.Answer,
                    Options = addQuestionViewModel.Options
                };
                context.Questions.Add(newQuestion);
                context.SaveChanges();

                return Redirect("Question");
            }

            return View("Add", addQuestionViewModel);

        }
    }
}
