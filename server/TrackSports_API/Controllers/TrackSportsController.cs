using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackSports.Authentication;
using TrackSports_API.TracksportModels;

namespace TrackSports_API.Controllers
{
    [Produces("application/json")]
    [Route("api/TrackSports")]
    public class TrackSportsController : Controller
    {

        [HttpPost()]
        [AllowAnonymous]
        public IActionResult GetAllEvents()
        {
            try
            {
                List<Event> events=new List<Event>();
                events.Add(new Event(){Id = 1, Name = "Footballl", Category = "Football", EventDay = "Monday", Location = "The Park", TimeStart = "12:00", Duration = 45});
                events.Add(new Event() { Id = 2, Name = "num 2", Category = "Netball", EventDay = "Tuesday", Location = "123 gim st. CBD", TimeStart = "12:45", Duration = 90 });
                events.Add(new Event() { Id = 3, Name = "Rugby", Category = "AFL", EventDay = "Saturday", Location = "The Other Park", TimeStart = "19:00", Duration = 120 });
                return Ok(events);
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }

    }
}