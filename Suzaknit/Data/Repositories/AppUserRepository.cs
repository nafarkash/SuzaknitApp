using Suzaknit.Entities;
using Suzaknit.Interfaces;

namespace Suzaknit.Data.Repositories
{
    public class AppUserRepository : GenericRepository<AppUser>, IAppUserRepository
    {
        public AppUserRepository(DataContext context) : base(context)
        {
        }
    }
}
