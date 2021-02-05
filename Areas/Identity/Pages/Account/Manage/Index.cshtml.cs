using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TestCentral.Models;

namespace TestCentral.Areas.Identity.Pages.Account.Manage
{
    public partial class IndexModel : PageModel
    {
        private readonly UserManager<TestUser> _userManager;
        private readonly SignInManager<TestUser> _signInManager;

        public IndexModel(
            UserManager<TestUser> userManager,
            SignInManager<TestUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public string Username { get; set; }

        [TempData]
        public string StatusMessage { get; set; }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            //[Phone]
            //[Display(Name = "Phone number")]
            //public string PhoneNumber { get; set; }

            [Required(ErrorMessage = "First name is required.")]
            [Display(Name ="First Name")]
            public string FirstName { get; set; }

            [Required(ErrorMessage = "Last name is required.")]
            [Display(Name = "Last Name")]
            public string LastName { get; set; }

            [Required]
            [Display(Name = "School Name")]
            public string SchoolName { get; set; }

            [Required]
            [Display(Name = "Emoji")]
            public string Emoji { get; set; }
        }

        private async Task LoadAsync(TestUser user)
        {
            var userName = await _userManager.GetUserNameAsync(user);
            //var phoneNumber = await _userManager.GetPhoneNumberAsync(user);

            Username = userName;

            Input = new InputModel
            {
                //PhoneNumber = phoneNumber,
                FirstName = user.FirstName,    
                LastName = user.LastName,
                SchoolName = user.SchoolName,
                Emoji = user.Emoji
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            await LoadAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (!ModelState.IsValid)
            {
                await LoadAsync(user);
                return Page();
            }

            //var phoneNumber = await _userManager.GetPhoneNumberAsync(user);
            //if (Input.PhoneNumber != phoneNumber)
            //{
            //    var setPhoneResult = await _userManager.SetPhoneNumberAsync(user, Input.PhoneNumber);
            //    if (!setPhoneResult.Succeeded)
            //    {
            //        StatusMessage = "Unexpected error when trying to set phone number.";
            //        return RedirectToPage();
            //    }
            //}

            if (Input.FirstName != user.FirstName)
            {
                user.FirstName = Input.FirstName;
            }
            
            if (Input.LastName != user.LastName)
            {
                user.LastName = Input.LastName;
            }
            if (Input.SchoolName != user.SchoolName)
            {
                user.SchoolName = Input.SchoolName;
            }
            if (Input.Emoji != user.Emoji)
            {
                user.Emoji = Input.Emoji;
            }

            await _signInManager.RefreshSignInAsync(user);
            StatusMessage = "Your profile has been updated";
            return RedirectToPage();
        }
    }
}
