using System;
using TestCentral.Models;
using Microsoft.EntityFrameworkCore;
using TestCentral.Data;
using TestCentral.Viewmodels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
<<<<<<< HEAD:Controllers/OptionsController.cs
using TestCentral.Models;
using Options = TestCentral.Models.Options;
=======
using System.Linq;
>>>>>>> f10f30ed0d2b429aa32f5859c8709210f523240e:Controllers/OptionController.cs

namespace TestCentral.Controllers
{ 
	public class OptionController : Controller
	{
		private TestDBContext context; //place holder
		
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
			Option option = new Models.Option();
			return View(option);
        }

		

		
	}

}
