using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using LSBlueZone.API.DTOs;
using LSBlueZone.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LSBlueZone.API.Controllers
{
    [ApiController]
    [Route("api/parking")]
    public class ParkingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ParkingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateParking(CreateParkingDTO dto)
        {
            var allowedDurations = new List<int> { 5, 15, 30, 45, 60, 120, 180 };

            if(!allowedDurations.Contains(dto.DurationMinutes))
            {
                return BadRequest("Tempo inválido");
            }

            var car = await _context.Cars.FindAsync(dto.CarId);
            if (car == null)
                return NotFound("Carro não encontrado");

            var zone = await _context.Zones.FindAsync(dto.ZoneId);
            if (zone == null)
                return NotFound("Bairro não encontrado");

            var activeParking = await _context.Parkings.FirstOrDefaultAsync(p => p.CarId == dto.CarId && p.EndTime > DateTime.UtcNow);

            if(activeParking != null)
            {
                return BadRequest("Este carro já possui um estacionamento ativo");
            }

            var startTime = DateTime.UtcNow;
            var endTime = startTime.AddMinutes(dto.DurationMinutes);

            //cálculo do preço
            var hours = dto.DurationMinutes / 60.0m;
            var totalPrice = Math.Round(hours * zone.PricePerHour, 2);

            var parking = new Parking
            {
                CarId = dto.CarId,
                ZoneId = dto.ZoneId,
                StartTime = startTime,
                EndTime = endTime,
                TotalPrice = totalPrice,
            };

            _context.Parkings.Add(parking);
            await _context.SaveChangesAsync();

            return Ok(parking);
        }
    }
}
