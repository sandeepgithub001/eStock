using EStock.Models;
using EStock.Models.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EStock.Services.Abstraction
{
    public interface IRequestProcessor
    {
        Task<int> UpdateCompanyRecord(Company company);
        Task<int> DeleteCompany(int id);
        Task<List<Company>> GetAllCompany();
        Task<Company> GetCompanyById(int id);
        Task<CompanyStock> GetCompanyStock(int id);
        Task<int> UpdateStockRecord(Stock stock);
        Task<List<Stock>> GetAllStock();
        Task<Stock> GetStockById(int id);

    }
}
