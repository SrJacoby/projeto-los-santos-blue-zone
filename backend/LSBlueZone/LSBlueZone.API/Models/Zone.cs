using System.ComponentModel.DataAnnotations;

namespace LSBlueZone.API.Models
{
    public class Zone
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        //preço por hora
        [Range(0, 9999)]
        public decimal PricePerHour { get; set; }
    }
}
