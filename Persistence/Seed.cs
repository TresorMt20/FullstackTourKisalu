using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
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