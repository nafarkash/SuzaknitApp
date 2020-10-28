using Suzaknit.Data;
using Suzaknit.DTO;
using Suzaknit.Entities;
using Suzaknit.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Suzaknit.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username already exists");

            using (var hmac = new HMACSHA512())
            {
                AppUser user = new AppUser
                {
                    UserName = registerDto.UserName.ToLower(),
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                    PasswordSalt = hmac.Key
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return new UserDto
                {
                    UserName = user.UserName,
                    Token = _tokenService.CreateToken(user)
                };
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            AppUser loggedInUser = await _context.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.UserName);
            if (loggedInUser == null) return BadRequest("Invalid Username");

            using (var hmac = new HMACSHA512(loggedInUser.PasswordSalt))
            {
                byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != loggedInUser.PasswordHash[i]) return Unauthorized("Invalid password");
                }

                return new UserDto
                {
                    UserName = loggedInUser.UserName,
                    Token = _tokenService.CreateToken(loggedInUser)
                };
            }
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(user => user.UserName == userName.ToLower());
        }
    }
}
