using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Data.Repositories.Generic
{
    public interface IGeneric<T> where T : class
    {
        Task Insert(T t);
        Task Delete(T t);
        Task Update(T t);
        Task<List<T>> GetList();
        Task<T> GetById(int id);
    }
}