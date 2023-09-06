using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Models;

namespace server.Data.Seed
{
    public class SeedArticles
    {
        public static async void Initialize(BlogifyContext context)
        {
            if (!context.Articles.Any())
            {
                var articles = File.ReadAllText("Data/Seed/articles.json");
                var listOfArticles = JsonConvert.DeserializeObject<List<Article>>(articles);

                foreach (var article in listOfArticles)
                {
                    await context.Articles.AddAsync(article);
                    await context.SaveChangesAsync();
                }

                await context.SaveChangesAsync();
            }
        }
    }
}