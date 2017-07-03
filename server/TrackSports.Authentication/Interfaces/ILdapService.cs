using TrackSports.Authentication.Models;

namespace TrackSports.Authentication.Interfaces
{
    public interface ILdapService
    {
        AppUser Login(string username, string password);
        AppUser SearchUser(string username);
    }
}