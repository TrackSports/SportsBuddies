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
        public ValuesController(IOptions<LdapConfig> ldapConfig )
        {
            _ldapconfig = ldapConfig.Value;
            _eventsRepo = new EventsRepo();
        }

        // GET api/values/5
        [HttpGet("allevents")]
        public List<Event> GetAllEvents()
        {
            List<Event> events = _eventsRepo.GetEvents();
            return events;
        }

        [HttpGet("eventsbyuser/{userid}")]
        public List<Event> GetEventsByUserId(string userid)
        {
            List<Event> events = _eventsRepo.GetEventsByUserId(userid);
            return events;
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

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}