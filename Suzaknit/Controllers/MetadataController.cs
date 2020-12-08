using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Suzaknit.Data;
using Suzaknit.DTO;
using Suzaknit.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Suzaknit.Controllers
{
    public class MetadataController : BaseController
    {
        private readonly DataContext _context;

        public MetadataController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("instruction")]
        public async Task<ActionResult<IEnumerable<InstructionMetadata>>> Instruction(IEnumerable<InstructionDto> instructionsDto)
        {
            try
            {
                IList<InstructionMetadata> instructions = new List<InstructionMetadata>();
                foreach (InstructionDto instruction in instructionsDto)
                {
                    instructions.Add(ConvertModelRecursively(instruction));
                }
                await _context.Instructions.AddRangeAsync(instructions);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMetadata), instructions);
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }

        [HttpGet("{metadata}")]
        public async Task<ActionResult<IEnumerable<InstructionMetadata>>> GetMetadata(string metdata)
        {
            try
            {
                return await _context.Instructions.ToListAsync();
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }

        private InstructionMetadata ConvertModelRecursively(InstructionDto instruction, int level = 0)
        {
            IList<InstructionMetadata> childInstructions = null;
            if (instruction.Items != null)
            {
                int incrementedLevel = level + 1;
                childInstructions = new List<InstructionMetadata>();
                foreach (InstructionDto childInstruction in instruction.Items)
                {
                    childInstructions.Add(ConvertModelRecursively(childInstruction, incrementedLevel));
                }
            }

            return new InstructionMetadata()
            {
                Level = level,
                Url = instruction.Url,
                TranslationKey = instruction.TranslationKey,
                Items = childInstructions
            };
        }
    }
}
