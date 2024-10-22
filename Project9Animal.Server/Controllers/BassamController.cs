using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
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

        [HttpPost("AddImage")]
        public async Task<IActionResult> AddImage(IFormFile image )
        {

            string imagePath = null;

            // Check if the uploaded file is not null
            if (image != null && image.Length > 0)
            {
                // Define the path where you want to save the uploaded image
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory");

                var filePath = Path.Combine(uploadsFolder,image.FileName);

                // Create the folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Save the uploaded file
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                // Set the image path to be saved in the database
                imagePath = filePath; // Save the local file path instead of a URL
            }




            return Ok(imagePath);
        }




        [HttpGet("getImage/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/SucessStory", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }
            return NotFound();
        }

    }
}
