using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;

namespace LSBlueZone.API.Models
{
    [Index(nameof(Plate), IsUnique  = true)]
    public class Car
    {
        public int Id { get; set; }

        [Required]
        public string Plate { get; set; } = string.Empty;
        public string? Model { get; set; }
        public string? Color { get; set; }

        public string? Name { get; set; }

        //FK
        public int UserId { get; set; }

        //Navigation
        public User? User { get; set; }
    }
}