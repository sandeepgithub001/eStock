using EStock.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.Services.Abstractions
{
    public interface IStockRepository
    {
        Task<int> AddStock(Stock stock);
        Task<IEnumerable<Stock>> GetAllStock();
        Task<Stock> GetStockById(Guid id);
    }
}
