using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using web.Models;

namespace web.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        static private InfoDb IDB { get; set; }
        private IConfiguration config { get; set; }

        public DataController(IConfiguration configuration)
        {
            config = configuration;
        }

        [HttpGet("[action]")]
        public IEnumerable<SpaceEvent> AllSpaceEvents()
        {
            if (IDB == null) { ReadData(); }

            return IDB != null ? IDB.Data : null;
        }

        [HttpGet("[action]/{month}")]
        public IEnumerable<SpaceEvent> SpaceEventsForMonth(int month)
        {
            if (IDB == null) { ReadData(); }

            if (IDB != null)
            {
                return IDB.ForMonth(month);
            }

            return null;
        }

        [HttpGet("[action]/{month}/{day}")]
        public SpaceEventGroup SpaceEventsForDay(int month, int day)
        {
            if (IDB == null) { ReadData(); }

            if (IDB != null)
            {
                return IDB.ForDay(month, day);
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
                IDB.Loaded();
            }
            catch (Exception ex) { Console.WriteLine(ex.ToString()); }
        }
    }
}