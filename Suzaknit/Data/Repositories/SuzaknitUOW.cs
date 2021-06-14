using Suzaknit.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Suzaknit.Data.Repositories
{
    public class SuzaknitUOW : IUnitOfWork
    {
        private readonly DataContext _context;
        private IAppUserRepository _userRepository;
        private IImageRepository _imageRepository;
        private IInstructionRepository _instructionRepository;

        public SuzaknitUOW(DataContext context)
        {
            _context = context;
        }

        public IAppUserRepository AppUserRepository
        {
            get
            {
                if (_userRepository == null)
                    _userRepository = new AppUserRepository(_context);

                return _userRepository;
            }
        }

        public IImageRepository ImageRepository
        {
            get
            {
                if (_imageRepository == null)
                    _imageRepository = new ImageRepository(_context);
                return _imageRepository;
            }
        }

        public IInstructionRepository InstructionRepository
        {
            get
            {
                if (_instructionRepository == null)
                    _instructionRepository = new InstructionsRepository(_context);
                return _instructionRepository;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
