using System;
using System.Collections.Generic;
using System.Linq;

namespace web.Models
{
    public class InfoDb
    {
        #region Constants
        public const string MONTH_DAY_FORMAT = "{0:00}{1:00}";
        #endregion

        #region Fields
        protected List<SpaceEvent> _Data = new List<SpaceEvent>();
        #endregion

        #region Properties
        private SpaceEventComparer SEC { get; set; }

        public Dictionary<string, string> Metadata { get; set; }
        public List<SpaceEvent> Data
        {
            get { return _Data; }
            set { _Data = value ?? new List<SpaceEvent>(); }
        }

        public SortedDictionary<string, List<SpaceEvent>> Organized { get; set; }
        protected SortedDictionary<string, PrevNext> PreviousNext { get; set; }
        #endregion

        #region Methods
        public void Loaded()
        {
            SEC = new SpaceEventComparer();
            try
            {
                Data.Sort(SEC);

                Organized = new SortedDictionary<string, List<SpaceEvent>>();
                string MonthDay = "";
                foreach (var OneEvent in Data)
                {
                    MonthDay = string.Format(MONTH_DAY_FORMAT, OneEvent.Month, OneEvent.Day);
                    if (!Organized.ContainsKey(MonthDay)) { Organized.Add(MonthDay, new List<SpaceEvent>()); }
                    Organized[MonthDay].Add(OneEvent);
                }

                string FirstDay = "";
                string LastDay = "";
                string Previous = "";
                PreviousNext = new SortedDictionary<string, PrevNext>();
                foreach (var OneDay in Organized.Keys)
                {
                    // Prep
                    if (FirstDay == "") { FirstDay = OneDay; }

                    // Current
                    PreviousNext.Add(OneDay, new PrevNext());
                    if (Previous != "")
                    {
                        PreviousNext[Previous].Next = OneDay;
                        PreviousNext[OneDay].Previous = Previous;
                    }

                    // Ready for next
                    Previous = OneDay;
                    LastDay = OneDay;
                }
                PreviousNext[FirstDay].Previous = LastDay;
                PreviousNext[LastDay].Next = FirstDay;
            }
            catch (Exception ex) { Console.WriteLine(ex.ToString()); }
        }
        public IEnumerable<SpaceEvent> ForMonth(int month)
        {
            if (Data.Count > 0)
            {
                return Data.Where(i => i.Month == month);
            }

            return null;
        }

        public SpaceEventGroup ForDay(int month, int day)
        {
            var Result = new SpaceEventGroup();
            if (Data.Count > 0)
            {
                var Target = string.Format(MONTH_DAY_FORMAT, month, day);

                var PrevDay = "";
                var NextDay = "";
                if (Organized.ContainsKey(Target))
                {
                    Result.Current = Organized[Target];
                    Result.CurrentCount = Result.Current.Count();
                }

                if (PreviousNext.ContainsKey(Target))
                {
                    PrevDay = PreviousNext[Target].Previous;
                    NextDay = PreviousNext[Target].Next;
                }
                else
                {
                    var CheckDate = new DateTime(DateTime.Now.Year, month, day);
                    var NewTarget = "";
                    while (!PreviousNext.ContainsKey(NewTarget))
                    {
                        CheckDate = CheckDate.AddDays(1);
                        NewTarget = string.Format(MONTH_DAY_FORMAT, CheckDate.Month, CheckDate.Day);
                    }
                    PrevDay = PreviousNext[NewTarget].Previous;
                    NextDay = PreviousNext[NewTarget].Next;
                    PreviousNext.Add(Target, new PrevNext(){ Previous=PrevDay, Next=NextDay});
                }

                Result.Previous = Organized[PrevDay].Last();
                Result.PreviousCount = Organized[PrevDay].Count();

                Result.Next = Organized[NextDay].First();
                Result.NextCount = Organized[NextDay].Count();
            }

            return Result;
        }
        #endregion

        #region Inner Classes
        protected class PrevNext
        {
            public string Previous { get; set; }
            public string Next { get; set; }
        }
        #endregion
    }
}