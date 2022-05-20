using EStock.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<int> AddStockRecord(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            return _context.SaveChanges();
        }

        public void UpdateStockRecord(Stock stock)
        {
            _context.Stocks.Update(stock);
            _context.SaveChanges();
        }

        public void DeleteStocksRecord(int id)
        {
            var entity = _context.Stocks.FirstOrDefault(t => t.id == id);
            _context.Stocks.Remove(entity);
            _context.SaveChanges();
        }

        public Task<Stock> GetStockSingleRecord(int id)
        {
            return _context.Stocks.FirstOrDefaultAsync(t => t.id == id);
        }

        public Task<List<Stock>> GetStocksRecords()
        {
            return _context.Stocks.ToListAsync();
        }
    }
}
