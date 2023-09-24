using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using AspNetCoreReactExt.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace AspNetCoreReactExt.Areas.Identity.Pages.Account
{
    public class IsAdult : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<IsAdult> _logger;

        public IsAdult(
            UserManager<ApplicationUser> userManager,
            ILogger<IsAdult> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        async public Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return new JsonResult(false);
            }
            return new JsonResult(user.IsAdult);
        }

    }
}
