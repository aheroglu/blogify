using Microsoft.AspNetCore.Mvc;
using server.Data.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly ArticleService _articleService;

        public ArticlesController(ArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _articleService.GetList();

            if (articles.Count == 0)
                return NoContent();

            return Ok(articles);
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> GetArticle(string key)
        {
            var article = await _articleService.GetByKey(key);

            if (article == null)
                return NotFound();

            return Ok(article);
        }

    }
}