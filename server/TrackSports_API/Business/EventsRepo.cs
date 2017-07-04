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
        private string _conString = "data source=ldmcoredev.infotrack.com.au;initial catalog=TrackSports;user id=LDMS;password=LDMS;";
        public List<Event> GetEvents()
        {
            List<Event> events = new List<Event>();
            using (SqlConnection con = new SqlConnection(_conString))
            {
                string sql = "select * from [Events]";
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Event ev = new Event();
                    ev.Id = Convert.ToInt32(dr["EventId"]);
                    ev.Name = dr["Name"].ToString();
                    ev.Location = dr["Location"].ToString();
                    ev.Category = dr["Category"].ToString();
                    ev.EventDay = dr["EventDay"].ToString();
                    ev.DateTimeStart = dr["DateTimeStart"].ToString();
                    ev.Duration = Convert.ToInt32(dr["Duration"]);
                    events.Add(ev);
                }
                con.Close();
            }
            return events;
        }

        public List<Event> GetEventsByUserId(string userId)
        {
            List<Event> events = new List<Event>();
            using (SqlConnection con = new SqlConnection(_conString))
            {
                string sql = "select * FROM [Events], UsersEvents UE, Users U where UE.EventId = [Events].EventId and U.UserId = UE.UserId and U.UserId = '" + userId + "' and Events.DateTimeStart > GETDATE() order by DateTimeStart asc ";
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Event ev = new Event();
                    ev.Id = Convert.ToInt32(dr["EventId"]);
                    ev.Name = dr["Name"].ToString();
                    ev.Location = dr["Location"].ToString();
                    ev.Category = dr["Category"].ToString();
                    ev.EventDay = dr["EventDay"].ToString();
                    ev.DateTimeStart = dr["DateTimeStart"].ToString();
                    ev.Duration = Convert.ToInt32(dr["Duration"]);
                    events.Add(ev);
                }
                con.Close();
            }
            return events;
        }

        public bool SaveNewEvent(Event newEvent)
        {
            using (SqlConnection con = new SqlConnection(_conString))
            {
                string sql = string.Format("insert [Events] ([Name], [Location], [Category], [EventDay], [DateTimeStart], [Duration]) Values ('{0}', '{1}', '{2}', '{3}', '{4}', {5} )",
                                                    newEvent.Name, newEvent.Location, newEvent.Category, newEvent.EventDay, newEvent.DateTimeStart, newEvent.Duration);
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.ExecuteNonQuery();
                con.Close();
            }
            return true;
        }

        public bool UserExists(string userId)
        {
            bool exists = false;
            using (SqlConnection con = new SqlConnection(_conString))
            {
                string sql = "select 1 from [Users] where userId='" + userId + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                SqlDataReader dr = cmd.ExecuteReader();
                exists = dr.Read();
                con.Close();
            }
            return exists;
        }

        public bool SaveUser(string newUserId, string nickName)
        {
            if (!UserExists(newUserId))
            {
                using (SqlConnection con = new SqlConnection(_conString))
                {
                    string sql = string.Format("insert [Users] ([UserId], [NickName]) Values ('{0}', '{1}')", newUserId, nickName);
                    con.Open();
                    SqlCommand cmd = new SqlCommand(sql, con);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return true;
            }
            return false;
        }

        public bool IsUserJoinedEvent(string userId, int eventId)
        {
            bool joined = false;
            using (SqlConnection con = new SqlConnection(_conString))
            {
                string sql = "select 1 from [UsersEvents] where userId='" + userId + "' and EventId=" + eventId;
                con.Open();
                SqlCommand cmd = new SqlCommand(sql, con);
                SqlDataReader dr = cmd.ExecuteReader();
                joined = dr.Read();
                con.Close();
            }
            return joined;
        }

        public bool JoinUserToEvent(string userId, int eventId)
        {
            if (UserExists(userId) &&  !IsUserJoinedEvent(userId, eventId))
            {
                using (SqlConnection con = new SqlConnection(_conString))
                {
                    string sql = string.Format("insert [UsersEvents] ([UserId], [EventId]) Values ('{0}', {1})", userId, eventId);
                    con.Open();
                    SqlCommand cmd = new SqlCommand(sql, con);
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return true;
            }
            return false;
        }
    }
}
