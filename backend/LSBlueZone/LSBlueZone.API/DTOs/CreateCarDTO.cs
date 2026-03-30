namespace LSBlueZone.API.DTOs
{
    public class CreateCarDTO
    {
        public string Plate { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
    }
}
