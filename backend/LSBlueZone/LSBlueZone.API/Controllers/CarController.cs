using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using LSBlueZone.API.DTOs;
using LSBlueZone.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LSBlueZone.API.Controllers
{
    [ApiController]
    [Route("api/car")]
    public class CarController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarController(AppDbContext context)
        {
            _context = context;
        }

        // Criar carro
        [HttpPost]
        public async Task<IActionResult> CreateCar(CreateCarDTO dto)
        {
            //verificar placa duplicada
            var plateExists = await _context.Cars.AnyAsync(c => c.Plate == dto.Plate);

            if(plateExists)
            {
                return BadRequest("Placa já foi registrada");
            }

            //verificar se o usuário existe
            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

            if (!userExists)
            {
                return NotFound("Usuário não encontrado");
            }

            var car = new Car
            {
                Plate = dto.Plate,
                Model = dto.Model,
                Color = dto.Color,
                Name = dto.Name,
                UserId = dto.UserId,
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok(car);
        }

        //Listar carros de um usuário
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCarsByUser(int userId)
        {
            var cars = await _context.Cars.Where(c => c.UserId == userId).ToListAsync();

            return Ok(cars);
        }
    }
}
