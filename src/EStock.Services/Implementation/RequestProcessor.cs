using EStock.DataAccess.Abstraction;
using EStock.Models;
using EStock.Models.Entities;
using EStock.Services.Abstraction;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMS.Services.Implementation
{
    public class RequestProcessor : IRequestProcessor
    {
        private readonly ICompanyData _companyData;
        private readonly IStockData _stockData;
        private readonly ILogger<RequestProcessor> _logger;

        public RequestProcessor(
            ICompanyData companyData,
            IStockData stockData,
            ILogger<RequestProcessor> logger)
        {
            _companyData = companyData ?? throw new ArgumentNullException(nameof(companyData));
            _stockData = stockData ?? throw new ArgumentNullException(nameof(stockData));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task<List<Stock>> GetAllStock()
        {
            try
            {
                return _stockData.GetStocksRecords();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }       
        }

        public Task<Stock> GetStockById(int id)
        {
            try
            {
                _logger.LogInformation("GetStock processing...");
                return _stockData.GetStockSingleRecord(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<int> UpdateStockRecord(Stock stock)
        {
            try
            {
                return _stockData.UpdateStockRecord(stock);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<int> DeleteCompany(int id)
        {
            try
            {
                return _companyData.DeleteCompanyRecord(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<List<Company>> GetAllCompany()
        {
            try
            {
                return _companyData.GetCompanyRecords();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<Company> GetCompanyById(int id)
        {
            try
            {
                return _companyData.GetCompanySingleRecord(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<CompanyStock> GetCompanyStock(CompanyStockRequest data)
        {
            try
            {
                return _companyData.GetCompanyStock(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public Task<int> UpdateCompanyRecord(Company company)
        {
            try
            {
                return _companyData.UpdateCompanyRecord(company);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }


    }
}
