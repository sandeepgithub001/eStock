using EStock.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EStock.DataAccess
{
    public class EStockContext : DbContext
    {
        public EStockContext(DbContextOptions<EStockContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=estockdb; Port=5432;User Id=SA;Password=pass@word1;Database=estockdb;");

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
