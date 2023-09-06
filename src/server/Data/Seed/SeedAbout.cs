using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using server.Models;

namespace server.Data.Seed
{
    public class SeedAbout
    {
        public static async void Initialize(BlogifyContext context)
        {
            if (!context.Abouts.Any())
            {
                var abouts = File.ReadAllText("Data/Seed/about.json");
                var listOfAbouts = JsonConvert.DeserializeObject<List<About>>(abouts);

                foreach (var about in listOfAbouts)
                {
                    await context.Abouts.AddAsync(about);
                    await context.SaveChangesAsync();
                }

                await context.SaveChangesAsync();
            }
        }
    }
}