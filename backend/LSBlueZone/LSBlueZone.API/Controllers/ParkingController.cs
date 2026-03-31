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
                activeParking.EndTime = activeParking.EndTime.AddMinutes(dto.DurationMinutes);

                var hoursExtra = dto.DurationMinutes / 60.0m;
                var extraPrice = Math.Round(hoursExtra * zone.PricePerHour, 2);

                activeParking.TotalPrice += extraPrice;

                await _context.SaveChangesAsync();

                return Ok(activeParking);
            }

            if(dto.DurationMinutes <= 0)
            {
                return BadRequest("Tempo inválido");
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

        [HttpGet("active/{carId}")]
        public async Task<IActionResult> GetActiveParking(int carId)
        {
            var parking = await _context.Parkings
                .Include(p => p.Zone)
                .FirstOrDefaultAsync(p =>
                    p.CarId == carId &&
                    p.EndTime > DateTime.UtcNow);

            if (parking == null)
                return NotFound("Nenhum estacionamento ativo");

            return Ok(parking);
        }

        [HttpPut("extend")]
        public async Task<IActionResult> ExtendParking(ExtendParkingDTO dto)
        {
            var allowedDurations = new List<int> { 5, 15, 30, 45, 60, 120, 180 };

            if (!allowedDurations.Contains(dto.AdditionalMinutes))
                return BadRequest("Tempo inválido");

            var parking = await _context.Parkings
                .Include(p => p.Zone)
                .FirstOrDefaultAsync(p =>
                    p.CarId == dto.CarId &&
                    p.EndTime > DateTime.UtcNow);

            if (parking == null)
                return NotFound("Nenhum estacionamento ativo");

            //adiciona tempo
            parking.EndTime = parking.EndTime.AddMinutes(dto.AdditionalMinutes);

            //recalcula preço
            var hours = dto.AdditionalMinutes / 60.0m;
            var extraPrice = Math.Round(hours * parking.Zone!.PricePerHour, 2);

            parking.TotalPrice += extraPrice;

            await _context.SaveChangesAsync();

            return Ok(parking);
        }

    }
}
