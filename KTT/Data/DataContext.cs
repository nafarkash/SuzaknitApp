using KTT.Entities;
using Microsoft.EntityFrameworkCore;

namespace KTT.Data
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
