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
    }
}
