using System;
using System.Collections.Generic;
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

    }
}

