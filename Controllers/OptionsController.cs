using System;
using TestCentral.Models;
using Microsoft.EntityFrameworkCore;
using TestCentral.Data;
using TestCentral.Viewmodels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace TestCentral.Controllers
{ 
	public class OptionsController : Controller
	{
		private TestDBContext context; //place holder
		
		public OptionsController(TestDBContext dbContext) //placeholder until we have db
        {
			context = dbContext;
        }
			
		// GET: /<controller>/
		public IActionResult Index()
        {
			List<Options> options = context.Options.ToList();
			return View(options);
        }

		public IActionResult Add()
        {
			Options option = new Models.Options();
			return View(option);
        }

		

		
	}

}
