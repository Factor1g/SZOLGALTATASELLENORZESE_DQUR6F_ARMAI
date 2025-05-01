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
                var rawUrl = url.Replace("https://", "").Replace("http://", "");
                var buffer = new byte[32];
                var options = new PingOptions(128,true);
                var reply = await pingSender.SendPingAsync(rawUrl,1000,buffer,options);
                
                results.Add(new PingResult
                {
                    Url = url,
                    IsLive = reply.Status == IPStatus.Success,
                    Address = reply.Address.ToString(),
                    RoundtripTime = reply.RoundtripTime,
                    Ttl = reply.Options?.Ttl ?? 0,
                    BufferSize = reply.Buffer.Length,
                });
            }           

            return Ok(results);
        }
    }
}
