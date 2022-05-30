using EStock.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
