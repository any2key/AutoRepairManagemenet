using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutopartsController : ControllerBaseEx
    {
        private readonly IDataService dataService;
        public AutopartsController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<AutoPart>>()
                {
                    IsOk = true,
                    Data = dataService.FetchParts()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] AutoPart part)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdatePart(part);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemovePart(id);
                return ApiResponse.OK;
            });
        }
    }
}
