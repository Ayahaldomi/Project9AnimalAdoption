﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project9_cohort4.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UsersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_context.Users.ToList());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, UpdateuserDTO user)
        {
            var existUser = _context.Users.Find(id);

            if (existUser == null)
            {
                return BadRequest();
            }
            existUser.FullName = user.FullName;
            existUser.Email = user.Email;
            existUser.IsAdmin = user.IsAdmin;
            existUser.FullName = user.Username;
            existUser.Password = user.PasswordHash;


            _context.Users.Update(existUser);
            _context.SaveChanges();
            return Ok(existUser);
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostUser(AddUserDTO user)
        {
            var newUser = new User
            {
                FullName = user.Username,
                Email = user.Email,
                IsAdmin = user.IsAdmin,
                Password = user.PasswordHash,
            };
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok();

        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
