using Suzaknit.Entities;
using Suzaknit.Enums;
using Suzaknit.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Suzaknit.Interfaces;

namespace Suzaknit.Controllers
{
    public class ImageController : BaseController
    {
        private const string UPLOADS_FOLDER = "uploads";
        private readonly IUnitOfWork _suzUOW;
        private readonly IWebHostEnvironment _env;
        private readonly string _uploadsFolderPath;

        public ImageController(IUnitOfWork suzUOW, IWebHostEnvironment env)
        {
            _suzUOW = suzUOW;
            _env = env;

            // Validate existing uploads folder
            _uploadsFolderPath = Path.Combine(_env.WebRootPath, UPLOADS_FOLDER);
            if (!Directory.Exists(_uploadsFolderPath))
            {
                Directory.CreateDirectory(_uploadsFolderPath);
            }
        }

        [HttpPost("upload")]
        public async Task<ActionResult<IEnumerable<UploadedImages>>> Upload([Required] IFormCollection data)
        {
            try
            {
                IList<UploadedImages> uploadedImages = new List<UploadedImages>();
                if (data.Files == null) return BadRequest("No Uploaded file in the upload request");
                StringValues category;
                data.TryGetValue("category", out category);
                if (category.Count == 0) return BadRequest("No specified category");

                foreach (IFormFile file in data.Files)
                {
                    string uniqueFileName = GetUniqueFileName(file.FileName);
                    string categoryPath = Path.Combine(_uploadsFolderPath, category.First());
                    if (!Directory.Exists(categoryPath))
                    {
                        Directory.CreateDirectory(categoryPath);
                    }

                    string filePath = Path.Combine(categoryPath, uniqueFileName);

                    uploadedImages.Add(new UploadedImages
                    {
                        Name = uniqueFileName,
                        Category = (EImageCategory)Enum.Parse(typeof(EImageCategory), category.First(), true),
                        Gallery = UPLOADS_FOLDER
                    });

                    // DB successfully updated, can save image to file system
                    await file.CopyToAsync(new FileStream(filePath, FileMode.Create));
                }
                _suzUOW.ImageRepository.InsertRange(uploadedImages);
                await _suzUOW.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategory), uploadedImages);
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }

        [HttpGet("{category}")]
        public ActionResult<IEnumerable<UploadedImages>> GetCategory([Required] string category)
        {
            try
            {
                var retValue = _suzUOW.ImageRepository.Get();
                var filteted = retValue.Where(image => image.Category.ToDescriptionString() == category);
                return Ok(retValue.ToList());
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }

    }
}
