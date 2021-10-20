using System;

namespace Domain
{
    public class Place
    {
        public Guid id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Continent { get; set; }
        public string Description { get; set; }
        public DateTime  Date { get; set; }
        
    }
}