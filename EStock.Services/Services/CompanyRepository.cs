using EStock.Models;
using EStock.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.Services.Services
{
    public class CompanyRepository : ICompanyRepository
    {
        public Task<int> DeleteCompany(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Company>> GetAllCompany()
        {
            throw new NotImplementedException();
        }

        public Task<Company> GetCompanyById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<int> InsertCompany(Company company)
        {
            throw new NotImplementedException();
        }
    }
}
