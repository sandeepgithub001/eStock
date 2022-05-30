using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EStock.Getway.Models
{
    public class AuthToken
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
