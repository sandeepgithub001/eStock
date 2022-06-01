using EStock.Models;
using EStock.Models.Entities;
using EStock.Services.Abstraction;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EStock.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IRequestProcessor _requestProcessor;
        public CompanyController(IRequestProcessor requestProcessor)
        {
            _requestProcessor = requestProcessor;
        }

        // GET: api/<CompanyController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _requestProcessor.GetAllCompany();
            return Ok(result);
        }

        // GET api/<CompanyController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _requestProcessor.GetCompanyById(id);
            return Ok(result);
        }

        // GET api/<CompanyController>/5
        [HttpPost("GetCompanyStock")]
        public async Task<IActionResult> GetCompanyStock([FromBody] CompanyStockRequest data)
        {
            var result = await _requestProcessor.GetCompanyStock(data);
            return Ok(result);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Company value)
        {
            var result = await _requestProcessor.UpdateCompanyRecord(value);
            return Ok(result);
        }

        // DELETE api/<CompanyController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _requestProcessor.DeleteCompany(id);
            return Ok(result);
        }
    }
}
