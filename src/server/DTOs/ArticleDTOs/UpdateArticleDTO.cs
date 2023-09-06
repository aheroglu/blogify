using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.ArticleDTOs
{
    public class UpdateArticleDTO
    {
        public string Title { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public bool IsPublished { get; set; } = false;

    }
}