using KTT.Entities;

namespace KTT.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
