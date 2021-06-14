using System.Threading.Tasks;

namespace Suzaknit.Interfaces
{
    public interface IUnitOfWork
    {
        IAppUserRepository AppUserRepository { get; }
        IImageRepository ImageRepository { get; }
        IInstructionRepository InstructionRepository { get; }
        Task<int> SaveChangesAsync();
    }
}
