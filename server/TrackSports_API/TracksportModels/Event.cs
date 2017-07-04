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
        public string DateTimeStart { get; set; }
        public int Duration { get; set; }
    }
    public class EventByUser: Event{
        public string userId { get; set; }
        public bool IsJoined { get; set; }
    }

    public class EventDetails : Event
    {
        public List<string> UsersJoined { get; set; }
    }
}
