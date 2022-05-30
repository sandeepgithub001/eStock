using EStock.Models;
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
            => optionsBuilder.UseNpgsql("Host=127.0.0.1;Database=estock;User id=postgres;Password=admin@123");

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
