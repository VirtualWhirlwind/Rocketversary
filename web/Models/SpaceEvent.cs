using System;
using System.Collections.Generic;

namespace web.Models
{
    public class SpaceEvent
    {
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string Country { get; set; }
        public DateTime Date { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }

        public int Year { get { return Date.Year; } }
        public int Month { get { return Date.Month; } }
        public int Day { get { return Date.Day; } }
        public string GenericDate { get { return Date.ToString("yyyy-MM-dd"); } }

        public DateTime ConvenienceDate { get { var Result = new DateTime(DateTime.Now.Year, Date.Month, Date.Day, Date.Hour, Date.Minute, Date.Second); return Result; } }
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