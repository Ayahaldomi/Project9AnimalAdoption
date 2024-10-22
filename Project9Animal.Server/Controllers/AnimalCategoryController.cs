using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalCategoryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AnimalCategoryController(MyDbContext context)
        {
            _context = context;
        }
        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromForm] CategoryCreateDto categoryDto)
        {
            // Validate request data
            if (string.IsNullOrEmpty(categoryDto.Name))
            {
                return BadRequest("Invalid category data.");
            }

            string imagePath = null;

            // Check if the uploaded file is not null
            if (categoryDto.Image != null && categoryDto.Image.Length > 0)
            {
                // Define the path where you want to save the uploaded image
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Animal");

                var filePath = Path.Combine(uploadsFolder, categoryDto.Image.FileName);

                // Create the folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Save the uploaded file
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await categoryDto.Image.CopyToAsync(fileStream);
                }

                // Set the image path to be saved in the database
                imagePath = filePath; // Save the local file path instead of a URL
            }


            // Create a new category object
            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                Image = categoryDto.Image.FileName // Save the filename (or path) of the uploaded image
            };

            // Add the category to the database
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }
        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

    }
}
