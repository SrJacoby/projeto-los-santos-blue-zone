using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using LSBlueZone.API.DTOs;
using LSBlueZone.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LSBlueZone.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDTO dto)
        {
            if(dto.Password != dto.ConfirmPassword)
            {
                return BadRequest("Senhas não conferem");
            }

            var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);

            if (emailExists)
            {
                return BadRequest("Email já existe");
            }

            var user = new User
            {
                Email = dto.Email,
                Username = dto.Username,
                Password = dto.Password,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Usuário criado");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _context.Users.
                FirstOrDefaultAsync(u => 
                    u.Email == dto.Email && 
                    u.Password == dto.Password
                );

            if(user == null)
            {
                return Unauthorized("Email ou senha inválidos");
            }

            return Ok(user);
        }

    }
}