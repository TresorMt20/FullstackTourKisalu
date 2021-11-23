
using Application.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Places
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> { public Place Place { get; set; }}

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Place).SetValidator(new PlaceValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
               _context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == userAccessor.GetUsername());

                var attendee = new PlaceAttendee
                {
                    AppUser = user,
                    Place = request.Place,
                    IsHost = true
                };

                request.Place.Attendees.Add(attendee);


                  _context.Places.Add(request.Place);
                var result=  await _context.SaveChangesAsync() > 0;
 
                if(!result) Result<Unit>.Failure("Failed to create place");
                  
                 return  Result<Unit>.Success(Unit.Value);
            }
        }
    }
}