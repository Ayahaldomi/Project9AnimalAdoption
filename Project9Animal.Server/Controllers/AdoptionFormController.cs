using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;
using System.Net.Mail;
using System.Net;

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



        [HttpPut("UpdateApplicationStatus")]
        public async Task<IActionResult> UpdateApplicationStatus(int applicationId, string status)
        {
            var application = _db.AdoptionApplications.FirstOrDefault(a => a.ApplicationId == applicationId);

            if (application == null)
            {
                return NotFound();
            }

            // تحديث حالة الطلب
            application.Status = status;
            _db.SaveChanges();

            // جلب بيانات المستخدم لإرسال البريد الإلكتروني
            var user = _db.Users.FirstOrDefault(u => u.UserId == application.UserId);
            if (user != null)
            {
                // إرسال البريد الإلكتروني بناءً على حالة الطلب
                string subject = "Adoption Application Status";
                string message;

                if (status == "Approved")
                {
                    message = $"Dear {user.FullName},\n\nYour adoption application has been approved!";
                }
                else
                {
                    message = $"Dear {user.FullName},\n\nUnfortunately, your adoption application has been rejected.";
                }

                // استدعاء دالة إرسال البريد الإلكتروني
                await SendEmail(user.Email, subject, message);
            }

            return Ok();
        }

        private async Task SendEmail(string email, string subject, string message)
        {
            // إعدادات البريد الإلكتروني
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("odatduha@gmail.com", "ijmt lrkb drnt vcao"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("odatduha@gmail.com"),
                Subject = subject,
                Body = message,
                IsBodyHtml = false,
            };
            mailMessage.To.Add(email);

            await smtpClient.SendMailAsync(mailMessage);
        }



    }
}
