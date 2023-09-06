using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models.Common;

namespace server.Models
{
    public class Article : BaseEntity
    {
        public string Title { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public int ViewCount { get; set; }
        public bool IsPublished { get; set; }
    }
}