using System.Collections.Generic;

namespace Suzaknit.DTO
{
    public class InstructionDto
    {
        public string Url { get; set; }
        public string TranslationKey { get; set; }
        public IEnumerable<InstructionDto> Items { get; set; }
    }
}
