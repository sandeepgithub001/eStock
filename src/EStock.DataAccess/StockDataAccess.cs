using EStock.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.DataAccess
{
    public class StockDataAccess
    {
        private readonly PostgreSqlContext _context;

        public StockDataAccess(PostgreSqlContext context)
        {
            _context = context;
        }

        public void AddStockRecord(Stock stock)
        {
            _context.Stocks.Add(stock);
            _context.SaveChanges();
        }

        public void UpdateStockRecord(Stock stock)
        {
            _context.Stocks.Update(stock);
            _context.SaveChanges();
        }

        public void DeleteStocksRecord(int id)
        {
            var entity = _context.Stocks.FirstOrDefault(t => t.Id == id);
            _context.Stocks.Remove(entity);
            _context.SaveChanges();
        }

        public Stock GetStockSingleRecord(int id)
        {
            return _context.Stocks.FirstOrDefault(t => t.Id == id);
        }

        public List<Stock> GetStocksRecords()
        {
            return _context.Stocks.ToList();
        }
    }
}
