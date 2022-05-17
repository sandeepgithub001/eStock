using System;

namespace EStock.Models
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string CEO { get; set; }
        public string TrunOver { get; set; }
        public string Website { get; set; }
        public string StockExchange { get; set; }

    }
}
