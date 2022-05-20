using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EStock.Models
{
    [Table("stocks")]
    public class Stock
    {
        public int id { get; set; }
        public int companyid { get; set; }
        public decimal stockprice { get; set; }
        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }

    }
}
