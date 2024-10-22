using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly MyDbContext _context;

        public HomeController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetTestimonials")]
        public IActionResult GetTestimonials()
        {
            var testimonials = _context.Testimonials
                .Where(t => t.IsAccept == true) // Only accepted testimonials
                .Select(t => new
                {
                    t.TestimonialId,
                    t.UserId,
                    t.TestimonialMessege,
                    UserName = t.User != null ? t.User.FullName : "Anonymous", // Assume User has a Name property

                })
                .ToList();

            return Ok(testimonials);
        }
        // GET: api/SuccessStory/top
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<StoryDto>>> GetStories()
        {
            var stories = await _context.SuccessStories
                .Select(s => new StoryDto
                {
                    StoryId = s.StoryId,
                    UserId = s.UserId,
                    Title = s.Title,
                    StoryText = s.StoryText,
                    Status = s.Status,
                    StoryDate = s.StoryDate,
                    PhotoUrl1 = s.PhotoUrl1,
                    CommentCount = s.Comments.Count() // Calculate comment count
                })
                .ToListAsync();

            return Ok(stories);
        }


    }
}
