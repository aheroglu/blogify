using Microsoft.EntityFrameworkCore;
using server.Data.Repositories;
using server.Models;
using Ganss.XSS;

namespace server.Data.Services
{
    public class ArticleService : IArticle
    {
        private readonly BlogifyContext _context;
        private readonly HtmlSanitizer _htmlSanitizer;

        public ArticleService(BlogifyContext context)
        {
            _context = context;
            _htmlSanitizer = new HtmlSanitizer();
        }

        public Task Delete(Article t)
        {
            throw new NotImplementedException();
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
            return await _context.Set<Article>().Where(p => p.IsPublished).OrderByDescending(p => p.CreatedDate).ToListAsync();
        }

        public Task Insert(Article t)
        {
            throw new NotImplementedException();
        }

        public Task Update(Article t)
        {
            throw new NotImplementedException();
        }
    }
}