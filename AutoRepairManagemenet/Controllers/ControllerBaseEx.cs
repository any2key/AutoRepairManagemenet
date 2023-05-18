using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

using ApiResponse = AutoRepairManagemenet.Models.Response;

namespace AutoRepairManagemenet.Controllers
{
    public class ControllerBaseEx : ControllerBase
    {
        protected IActionResult SafeRun(Func<string, object> action)
        {
            try
            {
                var resp = action("");
                return new JsonResult(resp);
            }
            catch (Exception ex)
            {
                return new JsonResult(ApiResponse.BadResponse(ex.Message));
            }
        }
    }
}
