using EStock.Api.Controllers;
using EStock.Models;
using EStock.Models.Entities;
using EStock.Services.Abstraction;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using Assert = NUnit.Framework.Assert;

namespace EStock.Tests
{
    public class EStockTest
    {    
        private CompanyController _companyController;
        private StockController _stockController;
        private Mock<IRequestProcessor> _requestProcessor;
        public Company _company;
        public Stock _stock;
        public CompanyStockRequest _companyStock;
    
        [SetUp]
        public void Setup()
        {
            _companyController = new CompanyController(_requestProcessor.Object);
            _stockController = new StockController(_requestProcessor.Object);
            _requestProcessor = new Mock<IRequestProcessor>();
            _company = new Company() { Id=1, CompanyCode = "XYZ001", CompanyCeo = "Naveen", CompanyName = "XYZ", Turnover = "10000000", Website = "www.xyz.com", StockExchange = "BSE", CreatedOn = DateTime.UtcNow };
            _stock = new Stock() { StockPrice = 1000, StartDate = DateTime.UtcNow, CompanyId = 1, EndDate = DateTime.UtcNow, CreatedOn=DateTime.UtcNow};
            _companyStock = new CompanyStockRequest() { CompanyId = 1, EndDate = DateTime.UtcNow.ToString(), StartDate = DateTime.UtcNow.ToString() };
        }

        [Test]
        public void CreateCompany_OkResult()
        {
            // Arrange
            _company.Id = 0;
            _requestProcessor.Setup(x => x.UpdateCompanyRecord(_company));

            // Act
            var actionResult = _companyController.Post(_company);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
            Assert.IsNotNull(actionResult);
        }

        [Test]
        public void CreateStock_OkResult()
        {
            // Arrange
            _requestProcessor.Setup(x => x.UpdateStockRecord(_stock));

            // Act
            var actionResult = _stockController.Post(_stock);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
            Assert.IsNotNull(actionResult);
        }

        [Test]
        public void GetAllCompany_OkResult()
        {
            // Arrange
            _requestProcessor.Setup(x => x.GetAllCompany());

            // Act
            var actionResult = _companyController.Get();

            // Assert
            Assert.IsNotNull(actionResult);
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
        }

        [Test]
        public void GetCompanyStock_OkResult()
        {
            // Arrange
            _requestProcessor.Setup(x => x.GetCompanyStock(_companyStock));

            // Act
            var actionResult = _companyController.GetCompanyStock(_companyStock);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
            Assert.IsNotNull(actionResult);
        }


        [Test]
        public void DeleteCompanyandStock_OkResult()
        {
            // Arrange
            _requestProcessor.Setup(x => x.DeleteCompany(_company.Id));

            // Act
            var actionResult = _companyController.Delete(_company.Id);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
            Assert.IsNotNull(actionResult);
        }

        [Test]
        public void UpdateCompany_OkResult()
        {
            // Arrange
            _requestProcessor.Setup(x => x.UpdateCompanyRecord(_company));

            // Act
            var actionResult = _companyController.Post(_company);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(actionResult);
            Assert.IsNotNull(actionResult);
        }
    }
}

