using System;
using Novell.Directory.Ldap;
using TrackSports.Authentication.Interfaces;
using TrackSports.Authentication.Models;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Microsoft.Extensions.Options;

namespace TrackSports.Authentication
{
    public class LdapService : ILdapService
    {
        private const string MemberOfAttribute = "memberOf";
        private const string DisplayNameAttribute = "displayName";
        private const string SamAccountNameAttribute = "sAMAccountName";
        private const string EmailAddressAttribute = "mail";

        private readonly LdapConfig _config;

        public LdapService(LdapConfig config)
        {
            _config = config;
        }

        public AppUser Login(string username, string password)
        {
            try
            {
                using (var ldapConnection = new LdapConnection())
                {
                    var appUser = new AppUser();

                    ldapConnection.Connect(_config.Url, _config.Port);
                    username = CleanUsername(username);

                    ldapConnection.Bind($"{_config.Domain}\\{username}", password);

                    if (ldapConnection.Bound)
                    {
                        appUser.IsAuthenticated = true;
                        GetUserDetails(ldapConnection, appUser, username);
                    }
                    else
                    {
                        appUser.IsAuthenticated = false;
                    }

                    return appUser;
                }
            }
            catch (Exception)
            {
                return null;
            }

        }

        public AppUser SearchUser(string username)
        {
            try
            {
                using (var ldapConnection = new LdapConnection())
                {
                    var appUser = new AppUser();

                    ldapConnection.Connect(_config.Url, _config.Port);
                    ldapConnection.Bind($"{_config.Domain}\\{_config.LdapUsername}", _config.LdapPassword);

                    if (ldapConnection.Bound)
                    {
                        GetUserDetails(ldapConnection, appUser, username);

                        return appUser;
                    }

                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        private void GetUserDetails(ILdapConnection ldapConnection, AppUser appUser, string username)
        {
            var searchFilter =
                string.Format("(&(objectClass=user)(objectClass=person)(sAMAccountName={0}))", username);

            var result = ldapConnection.Search(
                _config.Dn,
                LdapConnection.SCOPE_SUB,
                searchFilter,
                new[]
                {
                    MemberOfAttribute, DisplayNameAttribute, SamAccountNameAttribute, EmailAddressAttribute
                },
                false
            );

            var user = result.next();

            if (user != null)
            {
                appUser.DisplayName = user.getAttribute(DisplayNameAttribute).StringValue;
                appUser.Username = user.getAttribute(SamAccountNameAttribute).StringValue;
                appUser.Roles = user.getAttribute(MemberOfAttribute).StringValueArray;
                appUser.EmailAddress = user.getAttribute(EmailAddressAttribute).StringValue;
            }
        }

        private string CleanUsername(string username)
        {
            return username.Contains("@") ? username.Substring(0, username.Length - username.IndexOf('@')) : username;
        }
    }
}