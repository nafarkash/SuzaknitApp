using Suzaknit.Enums;
using System.ComponentModel.DataAnnotations;

namespace Suzaknit.Entities
{
    public class UploadedImages
    {
        [Key]
        public int Id { get; set; }
        public string Gallery { get; set; }
        public EImageCategory Category { get; set; }
        public string Name { get; set; }
    }
}
