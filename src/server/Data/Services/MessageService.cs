using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data.Repositories;
using server.Models;

namespace server.Data.Services
{
    public class MessageService : IMessage
    {
        private readonly BlogifyContext _context;

        public MessageService(BlogifyContext context)
        {
            _context = context;
        }

        public Task Delete(Message t)
        {
            throw new NotImplementedException();
        }

        public async Task<Message> GetById(int id)
        {
            return await _context.Set<Message>().FindAsync(id);
        }

        public async Task<List<Message>> GetList()
        {
            return await _context.Set<Message>().Where(p => p.IsRead == false).OrderByDescending(p => p.CreatedDate).ToListAsync();
        }

        public async Task Insert(Message t)
        {
            t.CreatedDate = DateTime.Now;
            await _context.AddAsync(t);
            await _context.SaveChangesAsync();
        }

        public Task Update(Message t)
        {
            throw new NotImplementedException();
        }

        public async void UpdateReadStatus(int messageId)
        {
            var values = await _context.Messages.FindAsync(messageId);

            if (!values.IsRead)
            {
                values.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}