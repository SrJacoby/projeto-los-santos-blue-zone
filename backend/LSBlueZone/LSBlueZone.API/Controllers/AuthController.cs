using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using LSBlueZone.API.DTOs;
using LSBlueZone.API.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LSBlueZone.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

            var jwtSettings = _configuration.GetSection("Jwt");
            var keyString = jwtSettings["Key"];

            if(string.IsNullOrEmpty(keyString))
            {
                return StatusCode(500, "JWT Key não configurada");
            }

            var key = Encoding.ASCII.GetBytes(keyString);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}