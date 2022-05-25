using EStock.DataAccess;
using EStock.Models;
using EStock.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EStock.Services.Services
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly CompanyDataAccess _companyDataAccess;
        public CompanyRepository(CompanyDataAccess companyDataAccess)
        {
            _companyDataAccess = companyDataAccess;
        }
        public Task<int> DeleteCompany(int id)
        {
            return _companyDataAccess.DeleteCompanyRecord(id);
        }

        public Task<List<Company>> GetAllCompany()
        {
            return _companyDataAccess.GetCompanyRecords();
        }

        public Task<Company> GetCompanyById(int id)
        {
            return _companyDataAccess.GetCompanySingleRecord(id);
        }
        
        public Task<CompanyStock> GetCompanyStock(int id)
        {
            return _companyDataAccess.GetCompanyStock(id);
        }

        public Task<int> InsertCompany(Company company)
        {
            return _companyDataAccess.AddCompanyRecord(company);
        }
    }
}
