using Suzaknit.Entities;

namespace Suzaknit.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
