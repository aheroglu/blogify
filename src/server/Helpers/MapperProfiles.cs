using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.DTOs.AboutDTOs;
using server.DTOs.ArticleDTOs;
using server.DTOs.MessageDTOs;
using server.Models;

namespace server.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<CreateArticleDTO, Article>();
            CreateMap<UpdateArticleDTO, Article>();

            CreateMap<UpdateAboutDTO, About>();

            CreateMap<CreateMessageDTO, Message>();
        }
    }
}