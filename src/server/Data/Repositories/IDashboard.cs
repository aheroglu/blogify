using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data.Repositories.Generic;
using server.Models;

namespace server.Data.Repositories
{
    public interface IDashboard : IGeneric<Article>
    {
        void UpdatePublishStatus(int articleId);
    }
}