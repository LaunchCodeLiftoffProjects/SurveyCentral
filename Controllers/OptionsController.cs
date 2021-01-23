using System;
using TestCentral.Models;
using Microsoft.EntityFrameworkCore;
using TestCentral.Data;
using TestCentral.Viewmodels;



namespace TestCentral.Controllers
{ 
	public class OptionsController : Controllers
	{
		

		// GET: /<controller>/
		public IActionResult Index()
        {
			List<Options> options = context.Options.ToList();
			return View(options)
        }

		public IActionResult Add()
        {
			Options newOptions = new Options();
			return View(newOptions)
        }

		
		public 
		{
		}
	}

}
