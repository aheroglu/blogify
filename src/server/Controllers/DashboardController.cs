using AutoMapper;
using Ganss.XSS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Data.Services;
using server.DTOs.AboutDTOs;
using server.DTOs.ArticleDTOs;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;
        private readonly AboutService _aboutService;
        private readonly MessageService _messageService;
        private readonly IMapper _mapper;

        public DashboardController(DashboardService dashboardService, IMapper mapper, AboutService aboutService, MessageService messageService)
        {
            _dashboardService = dashboardService;
            _mapper = mapper;
            _aboutService = aboutService;
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _dashboardService.GetList();

            if (articles.Count == 0)
                return NoContent();

            return Ok(articles);
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> GetArticle(string key)
        {
            var article = await _dashboardService.GetByKey(key);

            if (article == null)
                return NotFound();

            return Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArticle(CreateArticleDTO model)
        {
            var article = _mapper.Map<Article>(model);
            await _dashboardService.Insert(article);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _dashboardService.GetById(id);

            if (article == null)
                return NotFound();

            await _dashboardService.Delete(article);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(int id, UpdateArticleDTO model)
        {
            var article = await _dashboardService.GetById(id);

            if (article == null)
                return NotFound();

            article.Title = model.Title;
            article.Key = model.Key;
            article.Description = model.Description;
            article.Content = model.Content;
            article.Image = model.Image;

            var result = _mapper.Map(model, article);

            await _dashboardService.Update(result);

            return Ok();
        }

        [HttpPut("UpdatePublishStatus/{id}")]
        public async Task<IActionResult> UpdatePublishStatus(int id)
        {
            var article = await _dashboardService.GetById(id);

            if (article == null)
                return NotFound();

            _dashboardService.UpdatePublishStatus(article.Id);

            return Ok();
        }

        [HttpGet("GetAbout/{id}")]
        public async Task<IActionResult> GetAbout(int id)
        {
            return Ok(await _aboutService.GetById(id));
        }

        [HttpPut("EditAbout/{id}")]
        public async Task<IActionResult> UpdateAbout(int id, UpdateAboutDTO model)
        {
            var about = await _aboutService.GetById(id);

            var values = _mapper.Map(model, about);

            await _aboutService.Update(values);

            return Ok();
        }

        [HttpPut("UpdateReadStatus/{id}")]
        public async Task<IActionResult> UpdateReadStatus(int id)
        {
            var message = await _messageService.GetById(id);

            if (message == null)
                return NotFound();

            _messageService.UpdateReadStatus(message.Id);

            return Ok();
        }
    }
}