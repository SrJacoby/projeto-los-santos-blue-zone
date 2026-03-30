namespace LSBlueZone.API.DTOs
{
    public class CreateParkingDTO
    {
        public int CarId { get; set; }

        public int ZoneId { get; set; }

        //tempo em minutos
        public int DurationMinutes { get; set; }

    }
}
