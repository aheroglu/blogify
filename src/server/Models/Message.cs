using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models.Common;

namespace server.Models
{
    public class Message : BaseEntity
    {
        public string Name { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
    }
}