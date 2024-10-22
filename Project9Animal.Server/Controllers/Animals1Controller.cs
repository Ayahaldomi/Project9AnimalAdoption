﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project9_cohort4.Server.DTOs;
using Project9Animal.Server.DTOs;
using Project9Animal.Server.Models;

namespace Project9Animal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Animals1Controller : ControllerBase
    {
        private readonly MyDbContext _context;

        public Animals1Controller(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Animals
        [HttpGet]
        public IActionResult GetAnimals()
        {
            var animals = from animal in _context.Animals
                          join category in _context.Categories on animal.CategoryId equals category.Id into categoryGroup
                          from category in categoryGroup.DefaultIfEmpty() 
                          join shelter in _context.Shelters on animal.ShelterId equals shelter.ShelterId into shelterGroup
                          from shelter in shelterGroup.DefaultIfEmpty() 
                          select new
                          {
                              animal.AnimalId,
                              animal.Name,
                              CategoryId = animal.CategoryId,
                              CategoryName = category != null ? category.Name : "غير متوفر", 
                              ShelterName = shelter != null ? shelter.ShelterName : "غير متوفر", 
                              animal.Breed,
                              animal.Age,
                              animal.Size,
                              animal.Temperament,
                              animal.SpecialNeeds,
                              animal.Description,
                              animal.AdoptionStatus,
                              animal.Image1,
                              animal.Image2,
                              animal.Image3,
                              animal.Image4
                          };

            return Ok(animals.ToList()); 
        }

        [HttpGet("FilertName")]
        public IActionResult GetAnimalsFilertName(string name)
        {
            return Ok(_context.Animals.Where(i => i.Name == name).ToList());
        }
        // GET: api/Animals1/5
        [HttpGet("Animals1{id}")]
        public IActionResult GetAnimal(int id)
        {
            var animal = _context.Animals.Find(id);

            if (animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }

        // PUT: api/Animals1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public IActionResult PutAnimal(int id, [FromForm] updateAnimalDTO animal)
        //{
        //    var existAnimal = _context.Animals.Find(id);

        //    if (existAnimal == null)
        //    {
        //        return BadRequest();
        //    }
        //    existAnimal.Name = animal.Name;
        //    existAnimal.Age = animal.Age;
        //    existAnimal.Breed = animal.Breed;
        //    existAnimal.Size = animal.Size;
        //    existAnimal.Temperament = animal.Temperament;
        //    existAnimal.SpecialNeeds = animal.SpecialNeeds;
        //    existAnimal.Description = animal.Description;
        //    existAnimal.AdoptionStatus = animal.AdoptionStatus;
        //    existAnimal.Image1 = animal.PhotoUrl;

        //    _context.Animals.Update(existAnimal);
        //    _context.SaveChanges();
        //    return Ok(existAnimal);
        //}

        // POST: api/Animals1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        //[HttpPost]
        //public async Task<ActionResult<Animal>> PostAnimal([FromForm] addAnimalDTO animal)
        //{
        //    var newAnimal = new Animal
        //    {
        //        Name = animal.Name,

        //        Age = animal.Age,
        //        Breed = animal.Breed,
        //        Size = animal.Size,
        //        Temperament = animal.Temperament,
        //        SpecialNeeds = animal.SpecialNeeds,
        //        Description = animal.Description,
        //        AdoptionStatus = animal.AdoptionStatus,
        //        Image1 = animal.PhotoUrl,
        //    };
        //    _context.Animals.Add(newAnimal);
        //    _context.SaveChanges();

        //    return Ok(newAnimal);
        //}



        // DELETE: api/Animals1/5
        [HttpDelete("{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            var animal = _context.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animals.Remove(animal);
            _context.SaveChanges();

            return NoContent();
        }

        private bool AnimalExists(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }





        [HttpGet("GetAnimals")]
        public async Task<IActionResult> GetAllAnimals()
        {
            var animals = await _context.Animals
      .Join(_context.Shelters,
            animal => animal.ShelterId,
            shelter => shelter.ShelterId,
            (animal, shelter) => new
            {
                animal.AnimalId,
                animal.Name,
                animal.Breed,
                animal.Age,
                animal.Image1,
                animal.AdoptionStatus,
                ShelterName = shelter.ShelterName
            })
      .ToListAsync();


            return Ok(animals);
        }




        [HttpGet("getImages/{ImageName}")]

        public IActionResult getImage(string ImageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", ImageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpg");

            }
            return NotFound();


        }

        /////////////////////////
        [HttpGet("filter")]
        public IActionResult GetFilteredAnimals(
      [FromQuery] string? animalName = null,
      [FromQuery] string? categoryName = null,
      [FromQuery] string? shelterName = null)
        {

            var query = from animal in _context.Animals
                        join category in _context.Categories on animal.CategoryId equals category.Id
                        join shelter in _context.Shelters on animal.ShelterId equals shelter.ShelterId
                        select new
                        {
                            animal.AnimalId,
                            animal.Name,
                            CategoryName = category.Name,
                            shelterName = shelter.ShelterName,
                            animal.Breed,
                            animal.Age,
                            animal.Size,
                            animal.Temperament,
                            animal.AdoptionStatus,
                            animal.Description,
                            animal.Image1
                        };

            if (!string.IsNullOrEmpty(animalName))
            {
                query = query.Where(a => a.Name.Contains(animalName));
            }

            if (!string.IsNullOrEmpty(categoryName))
            {
                query = query.Where(a => a.CategoryName.Contains(categoryName));
            }


            if (!string.IsNullOrEmpty(shelterName))
            {
                query = query.Where(a => a.shelterName.Contains(shelterName));
            }


            var result = query.ToList();
            return Ok(result);
        }

        /////////////////
        ///
        [HttpPut("UpdateAnimal1/{id}")]
        public async Task<IActionResult> UpdateAnimal(int id, [FromForm] AnimalDTO updatedAnimalDto)
        {
   
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            
            animal.Name = updatedAnimalDto.Name;
            animal.CategoryId = updatedAnimalDto.CategoryId;
            animal.ShelterId = updatedAnimalDto.ShelterId;
            animal.Breed = updatedAnimalDto.Breed;
            animal.Age = updatedAnimalDto.Age;
            animal.Size = updatedAnimalDto.Size;
            animal.Temperament = updatedAnimalDto.Temperament;
            animal.SpecialNeeds = updatedAnimalDto.SpecialNeeds;
            animal.Description = updatedAnimalDto.Description;
            animal.AdoptionStatus = updatedAnimalDto.AdoptionStatus;

    
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            if (updatedAnimalDto.Image1 != null)
            {
                var image1Path = Path.Combine(folder, updatedAnimalDto.Image1.FileName);
                using (var stream = new FileStream(image1Path, FileMode.Create))
                {
                    await updatedAnimalDto.Image1.CopyToAsync(stream);
                }
                animal.Image1 = updatedAnimalDto.Image1.FileName;
            }

            if (updatedAnimalDto.Image2 != null)
            {
                var image2Path = Path.Combine(folder, updatedAnimalDto.Image2.FileName);
                using (var stream = new FileStream(image2Path, FileMode.Create))
                {
                    await updatedAnimalDto.Image2.CopyToAsync(stream);
                }
                animal.Image2 = updatedAnimalDto.Image2.FileName;
            }

            if (updatedAnimalDto.Image3 != null)
            {
                var image3Path = Path.Combine(folder, updatedAnimalDto.Image3.FileName);
                using (var stream = new FileStream(image3Path, FileMode.Create))
                {
                    await updatedAnimalDto.Image3.CopyToAsync(stream);
                }
                animal.Image3 = updatedAnimalDto.Image3.FileName;
            }

            if (updatedAnimalDto.Image4 != null)
            {
                var image4Path = Path.Combine(folder, updatedAnimalDto.Image4.FileName);
                using (var stream = new FileStream(image4Path, FileMode.Create))
                {
                    await updatedAnimalDto.Image4.CopyToAsync(stream);
                }
                animal.Image4 = updatedAnimalDto.Image4.FileName;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoesAnimalExist(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }


        private bool DoesAnimalExist(int id)
        {
            return _context.Animals.Any(e => e.AnimalId == id);
        }
        //////////////////////
       [HttpPost("AddAnimal")]
        public async Task<IActionResult> AddAnimal([FromForm] AnimalDTO newAnimalDto)
        {
        
            var animal = new Animal
            {
                Name = newAnimalDto.Name,
                CategoryId = newAnimalDto.CategoryId,
                ShelterId = newAnimalDto.ShelterId,
                Breed = newAnimalDto.Breed,
                Age = newAnimalDto.Age,
                Size = newAnimalDto.Size,
                Temperament = newAnimalDto.Temperament,
                SpecialNeeds = newAnimalDto.SpecialNeeds,
                Description = newAnimalDto.Description,
                AdoptionStatus = newAnimalDto.AdoptionStatus
            };

        
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            if (newAnimalDto.Image1 != null)
            {
                var image1Path = Path.Combine(folder, newAnimalDto.Image1.FileName);
                using (var stream = new FileStream(image1Path, FileMode.Create))
                {
                    await newAnimalDto.Image1.CopyToAsync(stream);
                }
                animal.Image1 = newAnimalDto.Image1.FileName;
            }

            if (newAnimalDto.Image2 != null)
            {
                var image2Path = Path.Combine(folder, newAnimalDto.Image2.FileName);
                using (var stream = new FileStream(image2Path, FileMode.Create))
                {
                    await newAnimalDto.Image2.CopyToAsync(stream);
                }
                animal.Image2 = newAnimalDto.Image2.FileName;
            }

            if (newAnimalDto.Image3 != null)
            {
                var image3Path = Path.Combine(folder, newAnimalDto.Image3.FileName);
                using (var stream = new FileStream(image3Path, FileMode.Create))
                {
                    await newAnimalDto.Image3.CopyToAsync(stream);
                }
                animal.Image3 = newAnimalDto.Image3.FileName;
            }

            if (newAnimalDto.Image4 != null)
            {
                var image4Path = Path.Combine(folder, newAnimalDto.Image4.FileName);
                using (var stream = new FileStream(image4Path, FileMode.Create))
                {
                    await newAnimalDto.Image4.CopyToAsync(stream);
                }
                animal.Image4 = newAnimalDto.Image4.FileName;
            }

          
            _context.Animals.Add(animal);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving animal: {ex.Message}");
            }

            return CreatedAtAction("GetAnimalById", new { id = animal.AnimalId }, animal);
        }


    }
}

