using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Suzaknit.DTO
{
    public class TranslationsDto
    {
        public SingleTranslationDto[] Translations { get; set; }
    }

    public class SingleTranslationDto
    {
        [Required]
        public string FileName { get; set; }
        [Required]
        public JsonElement Json { get; set; }
    }
}