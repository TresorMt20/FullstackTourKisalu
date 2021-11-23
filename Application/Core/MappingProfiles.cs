using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Places;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Place, Place>();
            CreateMap<Place,PlaceDto>()
            .ForMember(d =>d.HostUsername, o => o.MapFrom(s => s.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<PlaceAttendee, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}