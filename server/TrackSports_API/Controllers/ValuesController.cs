using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TrackSports.Authentication.Interfaces;
using TrackSports.Authentication;
using TrackSports.Authentication.Models;
using Microsoft.Extensions.Options;
using TrackSports_API.Business;
using TrackSports_API.TracksportModels;

namespace TrackSports_API.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private const string CONNECTION_STRING = "";
        private readonly LdapConfig _ldapconfig;
        private EventsRepo _eventsRepo;

        public ValuesController(IOptions<LdapConfig> ldapConfig)
        {
            _ldapconfig = ldapConfig.Value;
            _eventsRepo = new EventsRepo();
        }

        // GET api/values/5
        [HttpGet("allevents")]
        public List<Event> GetAllEvents()
        {
            List<Event> events = _eventsRepo.GetEvents();

            List<EventByUser> retEvents = new List<EventByUser>();
            foreach (var ev in retEvents)
            {
                var evByUser = new EventByUser();
                evByUser.userId = ""; //evByUser.events.ForEach(x => x.IsJoined = IsUserJoinedEvent(userId, x.Id));
                evByUser.IsJoined = true;
                retEvents.Add(evByUser);
            }

            return events;
        }

        [HttpPost("saveevent/{name}/{category}/{location}/{eventday}/{datetimeStart}/{duration}/{username}")]
        public List<Event> SaveEvent(string name, string category, string location, string eventday, string datetimestart, string duration, string username)
        {

            if (_eventsRepo.SaveNewEvent(new Event() { Name = name, Category = category, Location = location, EventDay = eventday, DateTimeStart = datetimestart, Duration = int.Parse(duration) }))
                return _eventsRepo.GetEventsByUserId(username);
            else
                return null;
        }

        [HttpPost("geteventsbyuser/{userid}")]
        public IActionResult GetEventsByUserId(string userid)
        {
            List<Event> events = _eventsRepo.GetEventsByUserId(userid);
            return events.ToJSON();
        }

        [HttpPost("joinevent/{userid}/{eventid}")]
        public IActionResult JoinEvent(string userid, string eventid)
        {
            int evId = 0;
            if (int.TryParse(eventid, out evId))
            {
                if (_eventsRepo.JoinUserToEvent(userid, evId))
                    return _eventsRepo.GetEventsByUserId(userid).ToJSON();
                else
                    return null;
            }
            throw new Exception("Eventid is not int");
        }

        [HttpPost("removeuserevent/{userid}/{eventid}")]
        public IActionResult RemoveUserEvent(string userid, string eventid)
        {
            int evId = 0;
            if (int.TryParse(eventid, out evId))
            {
                if (_eventsRepo.RemoveUserFromEvent(userid, evId))
                    return _eventsRepo.GetEventsByUserId(userid).ToJSON();
                else
                    return null;
            }
            throw new Exception("Eventid is not int");
        }

        [HttpPost("login/{username}/{password}")]
        [AllowAnonymous]
        public IActionResult Login(string username, string password)
        {
            try
            {
                LdapService _ldapService = new LdapService(_ldapconfig);
                var appUser = _ldapService.Login(username, password);

                if (appUser != null && appUser.IsAuthenticated)
                {
                    // insert user
                    if (!_eventsRepo.UserExists(username))
                        _eventsRepo.SaveUser(username, "");

                    Response.StatusCode = 200;
                    return Ok(Response.StatusCode);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

            }
            return null;
        }


    }
}