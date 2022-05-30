using EStock.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EStock.Models
{
    public class CompanyStock
    {
        public int Id { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string CompanyCeo { get; set; }
        public string Turnover { get; set; }
        public string Website { get; set; }
        public string StockExchange { get; set; }
        public List<Stock> Stocks { get; set; }

    }
}
