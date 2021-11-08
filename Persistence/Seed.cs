using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd"); 
                }
            }



            if(context.Places.Any()) return;

            var places = new List<Place>
            {
                new Place
                {
                    Name ="kodekanal",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "region",
                    Country = "India",
                    City = "Kochi",
                    Continent = "Asia",
                    Description = "Beatiful calm high place",
                },
                 new Place
                {
                    Name ="Fleuve congo",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Beach",
                    Country = "Congo",
                    City = "Kinshasa",
                    Continent = "Africa",
                    Description = "Coolest place to chill",
                },
                 new Place
                {
                    Name ="The Egyptian Museum",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Museum",
                    Country = "Egypt",
                    City = "Cairo",
                    Continent = "Africa",
                    Description = "home to an extensive collection of ancient Egyptian antiquities",
                },
                 new Place
                {
                    Name ="Hwange National Park",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Park",
                    Country = "Zimbabwe",
                    City = "Matabeleland North",
                    Continent = "Africa",
                    Description = "home to large elephant herds",
                },
                 new Place
                {
                    Name ="Gowa Road.",
                    Date = DateTime.Now.AddMonths(-2),
                    Category = "Street",
                    Country = "Ethiopia",
                    City = "Harar",
                    Continent = "Africa",
                    Description = "painted in dusty pinks, turquoise and oranges",
                }
            };

            await context.Places.AddRangeAsync(places);
            await context.SaveChangesAsync();
        }
    }
}