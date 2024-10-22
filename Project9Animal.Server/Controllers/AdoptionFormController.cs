using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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


    }
}
