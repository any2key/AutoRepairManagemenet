using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBaseEx
    {
        private readonly IDataService dataService;
        public JobsController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<Job>>()
                {
                    IsOk = true,
                    Data = dataService.FetchJobs()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] Job job)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdateJob(job);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemoveJob(id);
                return ApiResponse.OK;
            });
        }
    }
}
