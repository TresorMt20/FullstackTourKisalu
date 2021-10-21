using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Places
{
    public class Create
    {
        public class Command : IRequest<Unit> { public Place Place { get; set; }}
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                  _context.Places.Add(request.Place);
                  await _context.SaveChangesAsync();
                  
                 return  Unit.Value;
            }
        }
    }
}