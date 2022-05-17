using EStock.Models;
using EStock.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.Services.Services
{
    public class StockRepository : IStockRepository
    {
        public Task<int> AddStock(Stock stock)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Stock>> GetAllStock()
        {
            throw new NotImplementedException();
        }

        public Task<Stock> GetStockById(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
