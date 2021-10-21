using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Places
{
    public class Edit
    {
        public class Command : IRequest<Unit> { public Place Place { get; set; } }
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _mapper = mapper;
               _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var place = await _context.Places.FindAsync(request.Place.Id);

                _mapper.Map(request.Place, place);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}