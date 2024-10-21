using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OurCommunityDetailsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OurCommunityDetailsController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("getSeccessStoryByID/{id}")]
        public IActionResult getSeccessStoryByID(int id) { 

            var story = _context.SuccessStories.Find(id);
            return Ok(story);
        }
    }
}
