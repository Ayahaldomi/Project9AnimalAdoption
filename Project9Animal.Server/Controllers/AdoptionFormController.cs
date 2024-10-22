﻿using Microsoft.AspNetCore.Http;
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

        [HttpPost("SubmitAdoptionApplication")]
        public IActionResult SubmitAdoptionApplication([FromForm] AdoptionApplicationDto dto)
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

            return Ok(new { message = "Application submitted successfully!" });
        }
    }
}