using EStock.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public void AddCompanyRecord(Company company)
        {
            _context.Companies.Add(company);
            _context.SaveChanges();
        }

        public void UpdateCompanyRecord(Company company)
        {
            _context.Companies.Update(company);
            _context.SaveChanges();
        }

        public void DeleteCompanyRecord(int id)
        {
            var entity = _context.Companies.FirstOrDefault(t => t.Id == id);
            _context.Companies.Remove(entity);
            _context.SaveChanges();
        }

        public Company GetCompanySingleRecord(int id)
        {
            return _context.Companies.FirstOrDefault(t => t.Id == id);
        }

        public List<Company> GetCompanyRecords()
        {
            return _context.Companies.ToList();
        }
    }
}
