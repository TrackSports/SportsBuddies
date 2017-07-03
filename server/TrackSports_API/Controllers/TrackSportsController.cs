using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackSports.Authentication;
using TrackSports_API.Business;
using TrackSports_API.TracksportModels;

namespace TrackSports_API.Controllers
{
    [Produces("application/json")]
    [Route("api/TrackSports")]
    public class TrackSportsController : Controller
    {
        private EventsRepo _eventsRepo;
        public TrackSportsController(EventsRepo eventsRepo)
        {
            _eventsRepo = eventsRepo;
        }

        [HttpPost()]
        [AllowAnonymous]
        public IActionResult GetAllEvents()
        {
            try
            {

                List<Event> events = _eventsRepo.GetEvents();
                return Ok(events);
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }

    }
}