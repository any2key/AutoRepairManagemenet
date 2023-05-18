using AutoRepairManagemenet.Models;
using AutoRepairManagemenet.Services;
using Microsoft.AspNetCore.Mvc;
using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBaseEx
    {
        private readonly IDataService dataService;
        public OrdersController(IDataService dataService)
        {
            this.dataService = dataService;
        }


        [HttpGet]
        [Route("Fetch")]
        public async Task<IActionResult> Fetch()
        {
            return SafeRun(_ =>
            {
                return new DataResponse<IEnumerable<Order>>()
                {
                    IsOk = true,
                    Data = dataService.FetchOrders()
                };
            });
        }

        [HttpPost]
        [Route("AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromBody] Order Order)
        {
            return SafeRun(_ =>
            {
                dataService.AddOrUpdateOrder(Order);
                return ApiResponse.OK;
            });
        }

        [HttpGet]
        [Route("Remove")]
        public async Task<IActionResult> Remove(int id)
        {
            return SafeRun(_ =>
            {
                dataService.RemoveOrder(id);
                return ApiResponse.OK;
            });
        }

    }
}
