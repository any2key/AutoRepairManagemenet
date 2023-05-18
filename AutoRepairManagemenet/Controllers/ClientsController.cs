using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBaseEx
    {
        private readonly IDataService dataService;
        public ClientsController(IDataService dataService)
        {
            this.dataService = dataService;
        }


        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<Client>>()
                {
                    IsOk = true,
                    Data = dataService.FetchClients()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] Client client)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdateClient(client);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemoveClient(id);
                return ApiResponse.OK;
            });
        }

    }
}
