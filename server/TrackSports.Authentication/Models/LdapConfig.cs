namespace TrackSports.Authentication.Models
{
    public class LdapConfig
    {
        public string Url { get; set; }
        public int Port { get; set; }
        public string Domain { get; set; }
        public string Dn { get; set; }
        public string LdapUsername { get; set; }
        public string LdapPassword { get; set; }
    }
}