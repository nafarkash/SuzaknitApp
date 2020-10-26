using Suzaknit.Entities;
using Microsoft.EntityFrameworkCore;

namespace Suzaknit.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<UploadedImages> Images { get; set; }
    }
}
