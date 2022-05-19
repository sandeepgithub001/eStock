using EStock.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EStock.Services.Abstractions
{
    public interface IStockRepository
    {
        Task<int> AddStock(Stock stock);
        Task<List<Stock>> GetAllStock();
        Task<Stock> GetStockById(Guid id);
    }
}
