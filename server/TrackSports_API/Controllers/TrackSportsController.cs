using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TrackSports_API.Controllers
{
    [Produces("application/json")]
    [Route("api/TrackSports")]
    public class TrackSportsController : Controller
    {
        public TrackSportsController()
        {
            var a = "ad";
        }
    }
}