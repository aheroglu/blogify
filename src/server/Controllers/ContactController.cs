using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Data.Services;
using server.DTOs.MessageDTOs;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly MessageService _messageService;
        private readonly IMapper _mapper;

        public ContactController(MessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetMesssages()
        {
            var messages = await _messageService.GetList();

            if (messages.Count == 0)
                return NoContent();

            return Ok(messages);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage(int id)
        {
            var message = await _messageService.GetById(id);

            if (message == null)
                return NotFound();

            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(CreateMessageDTO model)
        {
            var message = _mapper.Map<Message>(model);
            await _messageService.Insert(message);
            return Ok();
        }
    }
}