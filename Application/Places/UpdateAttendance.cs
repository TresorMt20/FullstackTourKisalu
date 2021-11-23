using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using Domain;

namespace Application.Places
{
    public class UpdateAttendance
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

         public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var place = await _context.Places
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(place == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var hostUsername = place.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = place.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    place.IsCancelled = !place.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    place.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new PlaceAttendee
                    {
                        AppUser = user,
                        Place = place,
                        IsHost = false
                    };

                    place.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
}}