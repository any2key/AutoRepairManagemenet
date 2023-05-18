using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployersController:ControllerBaseEx
    {
        private readonly IDataService dataService;
        public EmployersController(IDataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<Employee>>()
                {
                    IsOk = true,
                    Data = dataService.FetchEmployers()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] Employee employee)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdateEmployee(employee);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemoveEmployee(id);
                return ApiResponse.OK;
            });
        }
    }
}
