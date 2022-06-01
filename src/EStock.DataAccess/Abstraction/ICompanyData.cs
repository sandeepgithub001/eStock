using EStock.Models;
using EStock.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.DataAccess.Abstraction
{
    public interface ICompanyData
    {
        Task<int> AddCompanyRecord(Company company);
        Task<int> UpdateCompanyRecord(Company company);
        Task<int> DeleteCompanyRecord(int id);
        Task<Company> GetCompanySingleRecord(int id);
        Task<CompanyStock> GetCompanyStock(CompanyStockRequest data);
        Task<List<Company>> GetCompanyRecords();
    }
}
