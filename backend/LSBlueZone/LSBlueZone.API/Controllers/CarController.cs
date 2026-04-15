using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using LSBlueZone.API.DTOs;
using LSBlueZone.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCar(CreateCarDTO dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if(userIdClaim == null)
            {
                return Unauthorized("Token inválido");
            }

            var userId = int.Parse(userIdClaim.Value);

            //verificar placa duplicada
            var plateExists = await _context.Cars.AnyAsync(c => c.Plate == dto.Plate);

            if(plateExists)
            {
                return BadRequest("Placa já foi registrada");
            }

            var car = new Car
            {
                Plate = dto.Plate,
                Model = dto.Model,
                Color = dto.Color,
                Name = dto.Name,
                UserId = userId,
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return Ok(car);
        }

        //Listar carros de um usuário
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMyCars()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null)
            {
                return Unauthorized("Token inválido");
            }

            var userId = int.Parse(userIdClaim.Value);

            var cars = await _context.Cars.Where(c => c.UserId == userId).ToListAsync();

            return Ok(cars);
        }

        //Deletar carro
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if(userIdClaim == null)
            {
                return Unauthorized("Token inválido");
            }

            var userId = int.Parse(userIdClaim.Value);

            var car = await _context.Cars.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if(car == null)
            {
                return NotFound("Veículo não encontrado");
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return Ok("Veículo removido");
        }
    }
}
