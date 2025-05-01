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
        public async Task<ActionResult<List<PingResult>>> Post(List<string> urls) 
        { 
            var results = new List<PingResult>();
            var pingSender = new Ping();
            foreach (var url in urls)
            {
                var reply = await pingSender.SendPingAsync(url);

                results.Add(new PingResult
                {
                    Url = url,
                    IsLive = reply.Status == IPStatus.Success,
                });
            }           

            return results;
        }
    }
}
