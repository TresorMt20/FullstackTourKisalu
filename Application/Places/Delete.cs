using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Places
{
    public class Delete
    {
        public class Command : IRequest<Unit> { public Guid Id { get; set; }}
        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var place = await _context.Places.FindAsync(request.Id);

                _context.Remove(place);
                await _context.SaveChangesAsync();

                return Unit.Value;
            
            }
        }
    }
}