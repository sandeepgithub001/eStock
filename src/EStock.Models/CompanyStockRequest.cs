namespace EStock.Models
{
    public class CompanyStockRequest
    {
        public int CompanyId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

    }
}
