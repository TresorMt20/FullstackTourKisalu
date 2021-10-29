using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using Application.Core;

namespace Application.Places
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> { public Place Place { get; set; } }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _mapper = mapper;
               _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var place = await _context.Places.FindAsync(request.Place.Id);

                if(place == null) return null;

                _mapper.Map(request.Place, place);

               var result= await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update place");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}