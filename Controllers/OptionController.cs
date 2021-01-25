using System;
using TestCentral.Models;
using Microsoft.EntityFrameworkCore;
using TestCentral.Data;
using TestCentral.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using TestCentral.Models;
using Options = TestCentral.Models.Option;
using System.Linq;


namespace TestCentral.Controllers
{ 
	public class OptionController : Controller
	{
		private TestDBContext context; 
		
		public OptionController(TestDBContext dbContext) //placeholder until we have db
        {
			context = dbContext;
        }
			
		// GET: /<controller>/
		public IActionResult Index()
        {
			List<Option> options = context.Options.ToList();

			return View(options);
        }

		
		public IActionResult Add()
        {
			AddOptionsViewModel addOptionsViewModel = new AddOptionsViewModel();
			return View(addOptionsViewModel);
        }

		[HttpPost]
		public IActionResult ProcessAddOptionForm(AddOptionsViewModel addOptionsViewModel)
        {
			if(ModelState.IsValid)
            {
				foreach(Option option in addOptionsViewModel.Options)
                {
					Option newOption = new Option
					{
						Value = option.Value,
						Label = option.Label
					};
				
				context.Options.Add(newOption);
                }
				
				context.SaveChanges();
				return Redirect("/Options");
            }
			
			return View("Add", addOptionsViewModel);
        }



	}

}
