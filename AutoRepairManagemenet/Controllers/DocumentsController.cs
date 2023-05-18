using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBaseEx
    {
        private readonly IDataService dataService;
        public DocumentsController(IDataService dataService)
        {
            this.dataService = dataService;
        }


        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<Document>>()
                {
                    IsOk = true,
                    Data = dataService.FetchDocuments()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] Document Document)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdateDocument(Document);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemoveDocument(id);
                return ApiResponse.OK;
            });
        }

    }
}
