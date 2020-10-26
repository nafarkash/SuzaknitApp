using System.ComponentModel.DataAnnotations;

namespace Suzaknit.DTO
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
