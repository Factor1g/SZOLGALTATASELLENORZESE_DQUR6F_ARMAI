namespace Szolgaltatas_ellenorzese.Models
{
    public class PingResult
    {
        public string Url { get; set; }
        public bool IsLive { get; set; }
        public string Address { get; set; }
        public long RoundtripTime { get; set; }
        public int Ttl { get; set; }
        public int BufferSize { get; set; }
    }
}
