using EStock.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EStock.DataAccess
{
    public class CompanyDataAccess
    {
        private readonly PostgreSqlContext _context;

        public CompanyDataAccess(PostgreSqlContext context)
        {
            _context = context;
        }

        //public async Task<int> AddCompanyRecord(Company company)
        //{
        //    await _context.Companies.AddAsync(company);
        //    return _context.SaveChanges();
        //}

        public async Task<int> UpdateCompanyRecord(Company company)
        {
            if (company.id > 0)
            {
                var entity = await _context.Companies.FirstOrDefaultAsync(t => t.id == company.id);
                entity.code = company.code;
                entity.name = company.name;
                entity.ceo = company.ceo;
                entity.trunover = company.trunover;
                entity.website = company.website;
                entity.stockexchange = company.stockexchange;

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
            var entity = await _context.Companies.FirstOrDefaultAsync(t => t.id == id);
            _context.Companies.Remove(entity);
            return _context.SaveChanges();
        }

        public Task<Company> GetCompanySingleRecord(int id)
        {
            return _context.Companies.FirstOrDefaultAsync(t => t.id == id);
        }

        public async Task<CompanyStock> GetCompanyStock(int id)
        {
            CompanyStock objCompanyStock = new CompanyStock();
            var objCompany = await _context.Companies.FirstOrDefaultAsync(t => t.id == id);
            objCompanyStock.id = objCompany.id;
            objCompanyStock.code = objCompany.code;
            objCompanyStock.name = objCompany.name;
            objCompanyStock.ceo = objCompany.ceo;
            objCompanyStock.trunover = objCompany.trunover;
            objCompanyStock.website = objCompany.website;
            objCompanyStock.stockexchange = objCompany.stockexchange;

            objCompanyStock.stocks = _context.Stocks.Where(x => x.companyid == id).ToList();

            return objCompanyStock;
        }

        public Task<List<Company>> GetCompanyRecords()
        {
            return _context.Companies.ToListAsync();
        }
    }
}
