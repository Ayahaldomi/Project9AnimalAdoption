using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
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

        [HttpGet("likes/{id}")]
        public IActionResult likes(int id) { 
            var like = _context.Likes.Count(l => l.StoryId == id);
            return Ok(like);
        }

        [HttpGet("commentsCount/{id}")]
        public IActionResult commentsCount(int id) { 
            var comments = _context.Comments.Count(c => c.StoryId == id);
            return Ok(comments);
        }

        [HttpGet("comments/{id}")]
        public IActionResult comments(int id) {
            var comments = _context.Comments
                .Where(c => c.StoryId == id)
                .Include(c => c.User)
                .ToList();
            
            return Ok(comments);
        }

        [HttpPost("isItLiked")]
        public IActionResult isItLiked([FromBody] LikePOST like)
        {
            var isExist = _context.Likes.FirstOrDefault(x => x.UserId == like.UserId && x.StoryId == like.StoryId);
            if (isExist == null)
            {
                return Ok(false);
            }
            else
            {
                return Ok(true);
            }
        }
        [HttpPost("addLike")]
        public IActionResult addLike([FromBody] LikePOST like) 
        {
            var isExist = _context.Likes.FirstOrDefault(x => x.UserId == like.UserId && x.StoryId == like.StoryId);
            if (isExist == null)
            {
                var likeMODEL = new Like
                {
                    UserId = like.UserId,
                    StoryId = like.StoryId,
                };
                _context.Likes.Add(likeMODEL);
                _context.SaveChanges();
                return Ok(like);
            }
            else
            {
                _context.Likes.Remove(isExist);
                _context.SaveChanges();
                return Ok(like);
            }
            
        }
    }
}
