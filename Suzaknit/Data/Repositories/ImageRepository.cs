using Suzaknit.Entities;
using Suzaknit.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Suzaknit.Data.Repositories
{
    public class ImageRepository : GenericRepository<UploadedImages>, IImageRepository
    {
        public ImageRepository(DataContext context) : base(context)
        {

        }

        public async void InsertRange(IList<UploadedImages> images)
        {
            await dbSet.AddRangeAsync(images);
        }
    }
}
