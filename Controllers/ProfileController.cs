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
    public class ProfileController : Controller
    {
        private ProfileDbContext context;

        public ProfileController(ProfileDbContext dbContext)
        {
            context = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        //Add New User

        [HttpGet("/AddProfile")]
        public IActionResult AddProfile()
        {
            AddProfileViewModel addProfileViewModel = new AddProfileViewModel();
            return View(addProfileViewModel);
        }

        [HttpPost]

        public IActionResult ProcessAddProfileForm(AddProfileViewModel viewModel)
        {

            if (ModelState.IsValid)
            {
                Profile theProfile = new Profile
                {
                    FirstName = viewModel.FirstName,
                    LastName = viewModel.LastName,
                    SchoolName = viewModel.SchoolName,
                    Emoji = viewModel.Emoji,
                };

                context.Profiles.Add(theProfile);
                return Redirect("index/");
            }
            return View(viewModel);
        }
        [HttpGet("/EditProfile")]
        public IActionResult Edit(int profileId)
        {
           if (ModelState.IsValid)
            {;
                return View(ProfileData.GetById(profileId));
            }
            return View();

        }

        [HttpPost]

        public IActionResult SubmitEditProfileForm(int profileId, string firstName, string lastName, string schoolName, string Emoji)
        {
            if (ModelState.IsValid)
            {
                return Redirect("index/");
            }
            return View();
        }

            
    }
}
