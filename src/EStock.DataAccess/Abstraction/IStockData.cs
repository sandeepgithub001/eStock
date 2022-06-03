using EStock.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EStock.DataAccess.Abstraction
{
    public interface IStockData
    {
        Task<int> AddStockRecord(Stock stock);
        Task<int> UpdateStockRecord(Stock stock);
        void DeleteStocksRecord(int id);
        Task<Stock> GetStockSingleRecord(int id);
        Task<List<Stock>> GetStocksRecords();
    }
}
