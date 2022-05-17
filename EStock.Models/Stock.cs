using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EStock.Models
{
    public class Stock
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public decimal StockPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
