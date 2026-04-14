namespace LSBlueZone.API.DTOs
{
    public class CreateCarDTO
    {
        public required string Plate { get; set; }
        public required string Model { get; set; }
        public required string Color { get; set; }
        public string? Name { get; set; }
    }
}
