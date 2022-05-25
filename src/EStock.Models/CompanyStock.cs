using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EStock.Models
{
    public class CompanyStock
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string ceo { get; set; }
        public string trunover { get; set; }
        public string website { get; set; }
        public string stockexchange { get; set; }
        public List<Stock> stocks { get; set; }

    }
}
