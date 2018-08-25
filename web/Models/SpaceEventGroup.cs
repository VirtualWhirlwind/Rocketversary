using System;
using System.Collections.Generic;

namespace web.Models
{
    public class SpaceEventGroup
    {
        public SpaceEvent Previous { get; set; }
        public int PreviousCount { get; set; }

        public IEnumerable<SpaceEvent> Current { get; set; }
        public int CurrentCount { get; set; }

        public SpaceEvent Next { get; set; }
        public int NextCount { get; set; }
    }
}