using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;

namespace TrackSports_API.TracksportModels
{
    public static class Extensions
    {
        public static JsonResult ToJSON(this object obj)
        {
            return new JsonResult(JsonConvert.SerializeObject(obj));
        }

        public static EventDetails ToEvetDetails(this Event ev)
        {
            EventDetails eventDetails=new EventDetails();
            eventDetails.Id = ev.Id;
            eventDetails.Name = ev.Name;
            eventDetails.Category = ev.Category;
            eventDetails.Location = ev.Location;
            eventDetails.EventDay = ev.EventDay;
            eventDetails.DateTimeStart = ev.DateTimeStart;
            eventDetails.Duration = ev.Duration;
            return eventDetails;
        }
    }
}

