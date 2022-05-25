using EStock.Models;
using EStock.Services.Abstractions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EStock.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;
        public CompanyController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        // GET: api/<CompanyController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _companyRepository.GetAllCompany();
            return Ok(result);
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _companyRepository.GetCompanyById(id);
            return Ok(result);
        }

        // GET api/<CompanyController>/5
        [HttpGet("GetCompanyStock/{id}")]
        public async Task<IActionResult> GetCompanyStock(int id)
        {
            var result = await _companyRepository.GetCompanyStock(id);
            return Ok(result);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Company value)
        {
            var result = await _companyRepository.UpdateCompanyRecord(value);
            return Ok(result);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _companyRepository.DeleteCompany(id);
            return Ok(result);
        }
    }
}
