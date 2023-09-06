using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using server.Models;

namespace server.Data.Seed
{
    public class SeedUser
    {
        public static async void Initialize(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    UserName = "defaultuser"
                };

                await userManager.CreateAsync(user, "Default_user1");
            }
        }
    }
}