using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrackSports_API.TracksportModels
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public string EventDay { get; set; }
        public string TimeStart { get; set; }
        public int Duration { get; set; }

    }
}
