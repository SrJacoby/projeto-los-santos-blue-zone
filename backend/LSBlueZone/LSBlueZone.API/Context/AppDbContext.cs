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
                new Zone { Id = 1, Name = "Los Santos International Airport", PricePerHour = 15},
                new Zone { Id = 2, Name = "Docks", PricePerHour = 8 },
                new Zone { Id = 3, Name = "La Puerta", PricePerHour = 7 },
                new Zone { Id = 4, Name = "South Los Santos", PricePerHour = 5 },
                new Zone { Id = 5, Name = "East Los Santos", PricePerHour = 5 },
                new Zone { Id = 6, Name = "Vespucci", PricePerHour = 11 },
                new Zone { Id = 7, Name = "Little Seoul", PricePerHour = 9 },
                new Zone { Id = 8, Name = "Downtown Los Santos", PricePerHour = 10 },
                new Zone { Id = 9, Name = "La Mesa", PricePerHour = 8 },
                new Zone { Id = 10, Name = "Del Perro", PricePerHour = 10 },
                new Zone { Id = 11, Name = "Rockford Hills", PricePerHour = 12 },
                new Zone { Id = 12, Name = "Vinewood", PricePerHour = 13 }
            );
        }
    }
}
