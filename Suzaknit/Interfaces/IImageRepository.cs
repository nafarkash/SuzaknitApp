using Suzaknit.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Suzaknit.Interfaces
{
    public interface IImageRepository : IGenericRepository<UploadedImages>
    {
        void InsertRange(IList<UploadedImages> images);
    }
}
