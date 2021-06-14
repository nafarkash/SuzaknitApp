using Suzaknit.Entities;
using Suzaknit.Interfaces;
using System.Collections.Generic;

namespace Suzaknit.Data.Repositories
{
    public class InstructionsRepository : GenericRepository<InstructionMetadata>, IInstructionRepository
    {
        public InstructionsRepository(DataContext context) : base(context)
        {
        }

        public async void InsertRange(IList<InstructionMetadata> instructions)
        {
            await dbSet.AddRangeAsync(instructions);
        }
    }
}
