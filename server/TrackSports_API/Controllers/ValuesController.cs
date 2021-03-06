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
using System.Text.RegularExpressions;

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
        [HttpGet("allevents/{username}")]
        public List<EventDetails> GetAllEvents(string username)
        {
            List<Event> events = _eventsRepo.GetEvents();

            List<EventDetails> retEvents = new List<EventDetails>();
            foreach (var ev in events)
            {
                EventDetails evByUser = ev.ToEvetDetails();
                evByUser.UserId = username;
                evByUser.IsJoined = _eventsRepo.IsUserJoinedEvent(username, ev.Id);
                evByUser.Members = _eventsRepo.GetUsersByEvent(ev.Id);
                retEvents.Add(evByUser);
            }

            return retEvents;
        }

        [HttpPost("saveevent/{name}/{category}/{location}/{eventday}/{datetimeStart}/{duration}/{username}")]
        public List<Event> SaveEvent(string name, string category, string location, string eventday, string datetimestart, string duration, string username)
        {

            eventday = eventday.Replace("{", "")?.Replace("}","");
            if (_eventsRepo.SaveNewEvent(new Event() { Name = name, Category = category, Location = location, EventDay = eventday, DateTimeStart = datetimestart, Duration = int.Parse(duration) }))
                return _eventsRepo.GetEventsByUserId(username);
            else
                return null;
        }

        [HttpGet("geteventsbyuser/{userid}")]
        [HttpPost("geteventsbyuser/{userid}")]
        public List<EventDetails> GetEventsByUserId(string userid)
        {
            List<Event> events = _eventsRepo.GetEventsByUserId(userid);
            List<EventDetails> retEvents = new List<EventDetails>();
            foreach (var ev in events)
            {
                EventDetails evByUser = ev.ToEvetDetails();
                evByUser.UserId = userid;
                evByUser.IsJoined = _eventsRepo.IsUserJoinedEvent(userid, ev.Id);
                evByUser.Members = _eventsRepo.GetUsersByEvent(ev.Id);
                retEvents.Add(evByUser);
            }
            return retEvents;
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