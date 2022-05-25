using EStock.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<int> AddCompanyRecord(Company company)
        {
            await _context.Companies.AddAsync(company);
            return _context.SaveChanges();
        }

        public void UpdateCompanyRecord(Company company)
        {
            _context.Companies.Update(company);
            _context.SaveChanges();
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

        public Task<CompanyStock> GetCompanyStock(int id)
        {
            return _context.Companies.FirstOrDefaultAsync(t => t.id == id);
        }

        public Task<List<Company>> GetCompanyRecords()
        {
            return _context.Companies.ToListAsync();
        }
    }
}
