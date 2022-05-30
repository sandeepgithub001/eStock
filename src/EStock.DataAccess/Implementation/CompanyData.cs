using EStock.DataAccess.Abstraction;
using EStock.Models;
using EStock.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EStock.DataAccess.Implementation
{
    public class CompanyData : ICompanyData
    {
        private readonly EStockContext _context;

        public CompanyData(EStockContext context)
        {
            _context = context;
        }

        public async Task<int> AddCompanyRecord(Company company)
        {
            await _context.Companies.AddAsync(company);
            return _context.SaveChanges();
        }

        public async Task<int> UpdateCompanyRecord(Company company)
        {
            if (company.Id > 0)
            {
                var entity = await _context.Companies.FirstOrDefaultAsync(t => t.Id == company.Id);
                entity.ComapnyCode = company.ComapnyCode;
                entity.CompanyName = company.CompanyName;
                entity.CompanyCeo = company.CompanyCeo;
                entity.Turnover = company.Turnover;
                entity.Website = company.Website;
                entity.StockExchange = company.StockExchange;

                _context.Companies.Update(entity).State = EntityState.Modified;
                return _context.SaveChanges();
            }
            else
            {
                _context.Companies.Add(company);
                return _context.SaveChanges();
            }
        }

        public async Task<int> DeleteCompanyRecord(int id)
        {
            var entity = await _context.Companies.FirstOrDefaultAsync(t => t.Id == id);
            _context.Companies.Remove(entity);
            return _context.SaveChanges();
        }

        public Task<Company> GetCompanySingleRecord(int id)
        {
            return _context.Companies.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<CompanyStock> GetCompanyStock(int id)
        {
            CompanyStock objCompanyStock = new();
            var objCompany = await _context.Companies.FirstOrDefaultAsync(t => t.Id == id);
            objCompanyStock.Id = objCompany.Id;
            objCompanyStock.CompanyCode = objCompany.ComapnyCode;
            objCompanyStock.CompanyName = objCompany.CompanyName;
            objCompanyStock.CompanyCeo = objCompany.CompanyCeo;
            objCompanyStock.Turnover = objCompany.Turnover;
            objCompanyStock.Website = objCompany.Website;
            objCompanyStock.StockExchange = objCompany.StockExchange;

            objCompanyStock.Stocks = _context.Stocks.Where(x => x.CompanyId == id).ToList();

            return objCompanyStock;
        }

        public Task<List<Company>> GetCompanyRecords()
        {
            return _context.Companies.ToListAsync();
        }
    }
}
