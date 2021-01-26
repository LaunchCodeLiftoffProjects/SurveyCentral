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
    public class UserController : Controller
    {
        private UserDbContext context;

        public UserController(UserDbContext dbContext)
        {
            context = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        //Add New User

        [HttpGet("/AddUser")]
        public IActionResult AddUser()
        {
            AddUserViewModel addUserViewModel = new AddUserViewModel();
            return View(addUserViewModel);
        }


        [HttpPost]

        public IActionResult ProcessAddUserForm(AddUserViewModel viewModel)
        {

            if (ModelState.IsValid)
            {
                AppUser theUser = new AppUser
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
