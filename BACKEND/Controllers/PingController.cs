using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using Szolgaltatas_ellenorzese.Models;

namespace Szolgaltatas_ellenorzese.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<PingResult>> Post(string url) 
        { 
            var result = new PingResult();
            var pingSender = new Ping();

            var reply = await pingSender.SendPingAsync(url);

            result.Url = url;
            result.IsLive = reply.Status == IPStatus.Success;

            return result;
        }
    }
}
