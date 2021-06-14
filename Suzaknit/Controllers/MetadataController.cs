using Microsoft.AspNetCore.Mvc;
using Suzaknit.DTO;
using Suzaknit.Entities;
using Suzaknit.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Suzaknit.Controllers
{
    public class MetadataController : BaseController
    {
        private readonly IUnitOfWork _suzUOW;

        public MetadataController(IUnitOfWork suzUOW)
        {
            _suzUOW = suzUOW;
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
                _suzUOW.InstructionRepository.InsertRange(instructions);
                await _suzUOW.SaveChangesAsync();
                return CreatedAtAction(nameof(GetMetadata), instructions);
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }

        [HttpGet("{metadata}")]
        public ActionResult<IEnumerable<InstructionMetadata>> GetMetadata(string metdata)
        {
            try
            {
                return Ok(_suzUOW.InstructionRepository.Get());
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
