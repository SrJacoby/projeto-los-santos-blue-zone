namespace LSBlueZone.API.Models
{
    public class Parking
    {
        public int Id { get; set; }

        public int CarId { get; set; }
        public Car? Car { get; set; }

        public int ZoneId { get; set; }
        public Zone? Zone { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public decimal TotalPrice { get; set; }

    }
}
