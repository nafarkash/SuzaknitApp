using Suzaknit.Entities;
using System.Collections.Generic;

namespace Suzaknit.Interfaces
{
    public interface IInstructionRepository : IGenericRepository<InstructionMetadata>
    {
        void InsertRange(IList<InstructionMetadata> images);
    }
}
