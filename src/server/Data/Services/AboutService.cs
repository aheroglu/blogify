using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ganss.XSS;
using Microsoft.EntityFrameworkCore;
using server.Data.Repositories;
using server.Models;

namespace server.Data.Services
{
    public class AboutService : IAbout
    {
        private readonly BlogifyContext _context;
        private readonly HtmlSanitizer _htmlSanitizer;

        public AboutService(BlogifyContext context)
        {
            _context = context;
            _htmlSanitizer = new HtmlSanitizer();
        }

        public Task Delete(About t)
        {
            throw new NotImplementedException();
        }

        public async Task<About> GetById(int id)
        {
            return await _context.Set<About>().FindAsync(id);
        }

        public Task<List<About>> GetList()
        {
            throw new NotImplementedException();
        }

        public Task Insert(About t)
        {
            throw new NotImplementedException();
        }

        public async Task Update(About t)
        {
            _htmlSanitizer.Sanitize(t.Content);
            _context.Update(t);
            await _context.SaveChangesAsync();
        }
    }
}