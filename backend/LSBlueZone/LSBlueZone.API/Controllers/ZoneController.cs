using Microsoft.AspNetCore.Mvc;
using LSBlueZone.API.Context;
using Microsoft.EntityFrameworkCore;

namespace LSBlueZone.API.Controllers
{
    [ApiController]
    [Route("api/zone")]
    public class ZoneController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ZoneController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetZones()
        {
            var zones = await _context.Zones.ToListAsync();
            return Ok(zones);
        }
    }
}
