using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Suzaknit.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace Suzaknit.Controllers
{
    public class TranslationController : BaseController
    {
        private const string TRANSLATION_FOLDER = "i18n";
        private readonly IWebHostEnvironment _env;
        private readonly string _translationFolderPath;

        public TranslationController(IWebHostEnvironment env)
        {
            _env = env;

            // Validate existing uploads folder
            _translationFolderPath = Path.Combine(_env.WebRootPath, TRANSLATION_FOLDER);
            if (!Directory.Exists(_translationFolderPath))
            {
                Directory.CreateDirectory(_translationFolderPath);
            }
        }

        [HttpPost("upload")]
        public async  Task<ActionResult> Upload(TranslationsDto translationDto)
        {
            try
            {
                List<Task> taskJobs = new List<Task>();
                foreach (var singleTranslation in translationDto.Translations)
                {
                    string filePath = Path.Combine(_translationFolderPath, singleTranslation.FileName);
                    var serializeOptions = new JsonSerializerOptions()
                    {
                        WriteIndented = true,
                        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.Create(System.Text.Unicode.UnicodeRanges.All)
                    };
                    string serilizedJson = JsonSerializer.Serialize(singleTranslation.Json, serializeOptions);
                    taskJobs.Add(System.IO.File.WriteAllTextAsync(filePath, serilizedJson));
                }

                await Task.WhenAll(taskJobs);
                return Ok();
            }
            catch (Exception ex)
            {
                // TODO: CHANGE!! Do not expose internal exception. Only for development purposes
                return BadRequest($"Internal error has occurred. {ex}");
            }
        }
    }
}
