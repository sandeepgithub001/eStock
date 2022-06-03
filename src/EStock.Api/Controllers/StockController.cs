using EStock.Models.Entities;
using EStock.Services.Abstraction;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EStock.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IRequestProcessor _requestProcessor;
        public StockController(IRequestProcessor requestProcessor)
        {
            _requestProcessor = requestProcessor;
        }

        // GET: api/<StockController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _requestProcessor.GetAllStock();
            return Ok(result);
        }

        // GET api/<StockController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _requestProcessor.GetStockById(id);
            return Ok(result);
        }

        // POST api/<StockController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Stock value)
        {

            var result = await _requestProcessor.UpdateStockRecord(value);
            return Ok(result);
        }

    }
}
