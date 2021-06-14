using Suzaknit.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Suzaknit.Interfaces;

namespace Suzaknit.Controllers
{
    public class UsersController : BaseController
    {
        private readonly IUnitOfWork _suzUOW;

        public UsersController(IUnitOfWork suzUOW)
        {
            _suzUOW = suzUOW;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return Ok(_suzUOW.AppUserRepository.Get());
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<AppUser> GetUser(int id)
        {
            return Ok(_suzUOW.AppUserRepository.GetByID(id));
        }
    }
}
