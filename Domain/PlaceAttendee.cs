using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class PlaceAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PlaceId { get; set; } 
        public Place Place { get; set; }
        public bool IsHost { get; set; }
    }
}