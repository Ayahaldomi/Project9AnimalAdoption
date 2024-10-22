using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BassamController : ControllerBase
    {
        private readonly MyDbContext _db;
         public BassamController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult GetBlog()
        {

            var blog = _db.SuccessStories.ToList();
            return Ok(blog);
        }
    }
}
