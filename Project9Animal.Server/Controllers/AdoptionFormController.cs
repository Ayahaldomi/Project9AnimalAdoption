using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdoptionFormController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AdoptionFormController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAllApplications")]
        public IActionResult GetAllApplications()
        {
          
            var applications = _db.AdoptionApplications
                                  .Include(a => a.User)
                                  .Include(a => a.Animal)
                                  .Select(app => new
                                  {
                                      ApplicationId = app.ApplicationId,
                                      UserId = app.UserId,
                                      AnimalId = app.AnimalId,
                                      AdopterName = app.User.FullName,
                                      AnimalName = app.Animal.Name,    
                                      AnimalImage = app.Animal.Image2, 
                                      ApplicationDate = app.ApplicationDate,
                                      Status = app.Status,
                                      IsReceived = app.IsReceived
                                  }).ToList();

            return Ok(applications);
        }


        [HttpGet("GetApplicationsByUserId/{userId}")]
        public IActionResult GetApplicationsByUserId(int userId)
        {
            var applications = _db.AdoptionApplications
                                  .Include(a => a.User)
                                  .Include(a => a.Animal)
                                  .Where(a => a.UserId == userId)
                                  .Select(app => new
                                  {
                                      ApplicationId = app.ApplicationId,
                                      UserId = app.UserId,
                                     
                                      AdopterName = app.User.FullName,
                                      AnimalName = app.Animal.Name,
                                      AnimalImage = app.Animal.Image2,
                                      ApplicationDate = app.ApplicationDate,
                                      Status = app.Status,
                                      IsReceived = app.IsReceived
                                  }).ToList();

            return Ok(applications);
        }


        [HttpPost("SubmitAdoptionApplication")]
        public IActionResult SubmitAdoptionApplication([FromBody] AdoptionApplicationDto dto)
        {
            
            var user = _db.Users.FirstOrDefault(u => u.UserId == dto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "User not found." });
            }

      
            user.Address = dto.Address;
            user.MedicalStatus = dto.MedicalStatus;
            user.FlatType = dto.FlatType;
            user.FinaincalStatus = dto.FinancialStatus;
            user.HaveKids = dto.HaveKids;
            user.MoreDetails = dto.MoreDetails;

          
            _db.SaveChanges();

         
            var adoptionApplication = new AdoptionApplication
            {
                UserId = user.UserId, 
                AnimalId = dto.AnimalId, 
                ApplicationDate = DateTime.UtcNow,
                Status = "Pending", 
                IsReceived = false
            };

            
            _db.AdoptionApplications.Add(adoptionApplication);
             _db.SaveChanges();

            return Ok(adoptionApplication);
        }


        [HttpGet("GetAnimalById/{animalId}")]
        public IActionResult GetAnimalById(int animalId)
        {
            var animal = _db.Animals.FirstOrDefault(a => a.AnimalId == animalId);
            if (animal == null)
            {
                return NotFound();
            }
            return Ok(animal);
        }


    }
}
