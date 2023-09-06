using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        private readonly AboutService _aboutService;

        public AboutController(AboutService aboutService)
        {
            _aboutService = aboutService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAbout(int id)
        {
            return Ok(await _aboutService.GetById(id));
        }
        
    }
}