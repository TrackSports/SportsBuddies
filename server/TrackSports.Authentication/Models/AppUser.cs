namespace TrackSports.Authentication.Models
{
    public class AppUser
    {
        public bool IsAuthenticated { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string[] Roles { get; set; }
        public string EmailAddress { get; set; }
    }
}