using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TestCentral.Data;
using TestCentral.Models;
using TestCentral.ViewModels;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace TestCentral.Controllers
{   [Authorize]
    public class TestUserController : Controller
    {
        private TestUserDbContext context;

        public TestUserController(TestUserDbContext dbContext)
        {
            context = dbContext;
        }

        //Get:  /index/
        public IActionResult Index()
        {
            return View();
        }

        //Add New User

        [HttpGet("/AddTestUser")]
        public IActionResult AddTestUser()
        {
            AddTestUserViewModel addTestUserViewModel = new AddTestUserViewModel();
            return View(addTestUserViewModel);
        }


        [HttpPost]

        public IActionResult ProcessAddTestUserForm(AddTestUserViewModel viewModel)
        {

            if (ModelState.IsValid)
            {
                TestUser theUser = new TestUser
                {
                    FirstName = viewModel.FirstName,
                    LastName = viewModel.LastName,
                    SchoolName = viewModel.SchoolName,
                    Emoji = viewModel.Emoji,
                };

                context.Users.Add(theUser);
                context.SaveChanges();
                return Redirect("index/");
            }
            return View(viewModel);
        }
    }
}
