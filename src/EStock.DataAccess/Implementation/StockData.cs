using EStock.DataAccess.Abstraction;
using EStock.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EStock.DataAccess.Implementation
{
    public class StockData:IStockData
    {
        private readonly EStockContext _context;

        public StockData(EStockContext context)
        {
            _context = context;
        }

        public async Task<int> AddStockRecord(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            return _context.SaveChanges();
        }

        public async Task<int> UpdateStockRecord(Stock stock)
        {
            if (stock.Id > 0)
            {
                var entity = await _context.Stocks.FirstOrDefaultAsync(t => t.Id == stock.Id);
                entity.CompanyId = stock.CompanyId;
                entity.StockPrice = stock.StockPrice;
                entity.StartDate = stock.StartDate;
                entity.EndDate = stock.EndDate;
                entity.ModifiedOn = DateTime.Now;

                _context.Stocks.Update(entity).State = EntityState.Modified;
                return _context.SaveChanges();
            }
            else
            {
                stock.CreatedOn = DateTime.Now;
                _context.Stocks.Add(stock);
                return _context.SaveChanges();
            }
        }

        public void DeleteStocksRecord(int id)
        {
            var entity = _context.Stocks.FirstOrDefault(t => t.Id == id);
            _context.Stocks.Remove(entity);
            _context.SaveChanges();
        }

        public Task<Stock> GetStockSingleRecord(int id)
        {
            return _context.Stocks.FirstOrDefaultAsync(t => t.Id == id);
        }

        public Task<List<Stock>> GetStocksRecords()
        {
            return _context.Stocks.ToListAsync();
        }
    }
}
