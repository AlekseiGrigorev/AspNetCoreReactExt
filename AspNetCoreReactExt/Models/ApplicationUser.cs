using Microsoft.AspNetCore.Identity;

namespace AspNetCoreReactExt.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public bool IsAdult { get; set; }
    }
}