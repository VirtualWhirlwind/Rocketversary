using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace web.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        static private InfoDb IDB { get; set; }
        private IConfiguration config { get; set; }

        private SpaceEventComparer SEC { get; set; }

        public DataController(IConfiguration configuration)
        {
            config = configuration;

            SEC = new SpaceEventComparer();
        }

        [HttpGet("[action]")]
        public IEnumerable<SpaceEvent> AllSpaceEvents()
        {
            if (IDB == null || IDB.Data == null) { ReadData(); }

            return IDB != null ? IDB.Data : null;
        }

        [HttpGet("[action]/{month}")]
        public IEnumerable<SpaceEvent> SpaceEventsForMonth(int month)
        {
            if (IDB == null || IDB.Data == null) { ReadData(); }

            if (IDB != null && IDB.Data != null)
            {
                return IDB.Data.Where(i => i.Month == month);
            }

            return null;
        }

        protected void ReadData()
        {
            IDB = new InfoDb();

            try
            {
                string DataContent = System.IO.File.ReadAllText(config.GetSection("Data").GetSection("Path").Value);
                IDB = Newtonsoft.Json.JsonConvert.DeserializeObject<InfoDb>(DataContent);
                IDB.Data.Sort(SEC);
            }
            catch (Exception ex) { Console.WriteLine(ex.ToString()); }
        }

        public class InfoDb
        {
            public Dictionary<string, string> Metadata { get; set; }
            public List<SpaceEvent> Data { get; set; }
        }

        public class SpaceEvent
        {
            public string Name { get; set; }
            public string Country { get; set; }
            public DateTime Date { get; set; }
            public string URL { get; set; }

            public int Year { get { return Date.Year; } }
            public int Month { get { return Date.Month; } }
            public int Day { get { return Date.Day; } }
            public string GenericDate { get { return Date.ToString("yyyy-MM-dd"); } }
        }

        public class SpaceEventComparer : IComparer<SpaceEvent>
        {
            public int Compare(SpaceEvent one, SpaceEvent two)
            {
                if (one == null)
                {
                    if (two == null) { return 0; }
                    else { return -1; }
                }
                else
                {
                    if (two == null) { return 1; }
                    else
                    {
                        var Result = one.Date.CompareTo(two.Date);

                        if (Result == 0)
                        {
                            Result = one.Name.CompareTo(two.Name);
                        }

                        return Result;
                    }
                }
            }
        }
    }
}