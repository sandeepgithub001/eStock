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
                entity.CompanyCode = company.CompanyCode;
                entity.CompanyName = company.CompanyName;
                entity.CompanyCeo = company.CompanyCeo;
                entity.Turnover = company.Turnover;
                entity.Website = company.Website;
                entity.StockExchange = company.StockExchange;
                entity.ModifiedOn = DateTime.Now;

                _context.Companies.Update(entity).State = EntityState.Modified;
                return _context.SaveChanges();
            }
            else
            {
                company.CreatedOn = DateTime.Now;
                _context.Companies.Add(company);
                return _context.SaveChanges();
            }
        }

        public async Task<int> DeleteCompanyRecord(int id)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(t => t.Id == id);
            if (company != null)
            {
                var lstStock = _context.Stocks.Where(x => x.CompanyId == id).ToList();
                _context.Stocks.RemoveRange(lstStock);
            }
            _context.Companies.Remove(company);
            return _context.SaveChanges();
        }

        public Task<Company> GetCompanySingleRecord(int id)
        {
            return _context.Companies.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<CompanyStock> GetCompanyStock(CompanyStockRequest data)
        {
            CompanyStock objCompanyStock = new();
            var objCompany = await _context.Companies.FirstOrDefaultAsync(t => t.Id == data.CompanyId);
            objCompanyStock.Id = objCompany.Id;
            objCompanyStock.CompanyCode = objCompany.CompanyCode;
            objCompanyStock.CompanyName = objCompany.CompanyName;
            objCompanyStock.CompanyCeo = objCompany.CompanyCeo;
            objCompanyStock.Turnover = objCompany.Turnover;
            objCompanyStock.Website = objCompany.Website;
            objCompanyStock.StockExchange = objCompany.StockExchange;

            objCompanyStock.Stocks = _context.Stocks.
                                    Where(x => x.CompanyId == data.CompanyId &&
                                    (x.StartDate >= Convert.ToDateTime(data.StartDate) && x.EndDate <= Convert.ToDateTime(data.EndDate))).ToList();

            return objCompanyStock;
        }

        public Task<List<Company>> GetCompanyRecords()
        {
            return _context.Companies.ToListAsync();
        }
    }
}
