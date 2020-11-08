using System.Collections.Generic;

namespace Suzaknit.Entities
{
    public class InstructionMetadata
    {
        public int Id { get; set; }
        public int Level { get; set; }
        public string Url { get; set; }
        public string TranslationKey { get; set; }
        public IEnumerable<InstructionMetadata> Items { get; set; }
    }
}
