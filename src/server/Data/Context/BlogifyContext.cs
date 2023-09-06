using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class BlogifyContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public BlogifyContext(DbContextOptions<BlogifyContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source = social.db");
        }

        public DbSet<About> Abouts { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}