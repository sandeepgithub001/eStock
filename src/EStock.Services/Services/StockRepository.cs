using EStock.DataAccess;
using EStock.Models;
using EStock.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EStock.Services.Services
{
    public class StockRepository : IStockRepository
    {
        private readonly StockDataAccess _stockDataAccess;

        public StockRepository(StockDataAccess stockDataAccess)
        {
            _stockDataAccess = stockDataAccess;
        }
        public Task<int> AddStock(Stock stock)
        {
            return _stockDataAccess.AddStockRecord(stock);
        }

        public Task<List<Stock>> GetAllStock()
        {
            return _stockDataAccess.GetStocksRecords();
        }

        public Task<Stock> GetStockById(int id)
        {
            return _stockDataAccess.GetStockSingleRecord(id);
        }


    }
}
