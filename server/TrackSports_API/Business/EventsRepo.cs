using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TrackSports_API.TracksportModels;

namespace TrackSports_API.Business
{
    public class EventsRepo
    {
        public List<Event> GetEvents()
        {
            List < Event > events=new List<Event>();
            using (SqlConnection con = new SqlConnection("data source=ldmcoredev.infotrack.com.au;initial catalog=TrackSports;user id=LDMS;password=LDMS;"))
            {
                string sql = "select * from [Events]";
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                { Event ev=new Event();
                    ev.Id = Convert.ToInt32(dr["EventId"]);
                    ev.Name = dr["Name"].ToString();
                    ev.Location=dr["Location"].ToString();
                    ev.Category=dr["Category"].ToString();
                    ev.EventDay=dr["EventDay"].ToString();
                    ev.DateTimeStart = dr["DateTimeStart"].ToString();
                    ev.Duration=Convert.ToInt32(dr["Duration"]);
                    events.Add(ev);
                }
                con.Close();
            }
            return events;
        }
    }
}
