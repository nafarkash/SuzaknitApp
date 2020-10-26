using Suzaknit.Enums;

namespace Suzaknit.Entities
{
    public class UploadedImages
    {
        public int Id { get; set; }
        public string Gallery { get; set; }
        public EImageCategory Category { get; set; }
        public string Name { get; set; }
    }
}
