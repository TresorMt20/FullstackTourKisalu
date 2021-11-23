using System;
using System.Collections.Generic;
using Application.Profiles;
namespace Application.Places
{
    public class PlaceDto
    {
         public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Continent { get; set; }
        public string Description { get; set; }
        public DateTime  Date { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<Profile> Attendees { get; set; } 
    }
}