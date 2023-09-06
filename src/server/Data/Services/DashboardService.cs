using Ganss.XSS;
using Microsoft.EntityFrameworkCore;
using server.Data.Repositories;
using server.Models;

namespace server.Data.Services
{
    public class DashboardService : IDashboard
    {
        private readonly BlogifyContext _context;
        private readonly HtmlSanitizer _htmlSanitizer;

        public DashboardService(BlogifyContext context)
        {
            _context = context;
            _htmlSanitizer = new HtmlSanitizer();
        }

        public async Task Delete(Article t)
        {
            _context.Remove(t);
            await _context.SaveChangesAsync();
        }

        public async Task<Article> GetById(int id)
        {
            return await _context.Set<Article>().FindAsync(id);
        }

        public async Task<Article> GetByKey(string key)
        {
            return await _context.Set<Article>().Where(p => p.Key == key).FirstOrDefaultAsync();
        }

        public async Task<List<Article>> GetList()
        {
            return await _context.Set<Article>().OrderByDescending(p => p.CreatedDate).ToListAsync();
        }

        public async Task Insert(Article t)
        {
            t.CreatedDate = DateTime.Now;
            _htmlSanitizer.Sanitize(t.Content);
            await _context.AddAsync(t);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Article t)
        {
            _htmlSanitizer.Sanitize(t.Content);
            _context.Update(t);
            await _context.SaveChangesAsync();
        }

        public async void UpdatePublishStatus(int articleId)
        {
            var values = await _context.Articles.FindAsync(articleId);

            if (values.IsPublished)
            {
                values.IsPublished = false;
                await _context.SaveChangesAsync();
            }
            else
            {
                values.IsPublished = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}