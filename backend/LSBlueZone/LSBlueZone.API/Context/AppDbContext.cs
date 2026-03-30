using Microsoft.EntityFrameworkCore;
using LSBlueZone.API.Models;

namespace LSBlueZone.API.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<Zone> Zones { get; set; }

        public DbSet<Parking> Parkings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Parking>().Property(p => p.TotalPrice).HasPrecision(10, 2);

            modelBuilder.Entity<Zone>().Property(z => z.PricePerHour).HasPrecision(10, 2);

            modelBuilder.Entity<Zone>().HasData(
                new Zone { Id = 1, Name = "Vinewood", PricePerHour = 15}
            );
        }
    }
}
