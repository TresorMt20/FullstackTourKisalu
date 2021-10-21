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
    public class Details
    {
        public class Query : IRequest<Place> {public Guid Id { get; set; }}
        public class Handler : IRequestHandler<Query, Place>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }
            public async Task<Place> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Places.FindAsync(request.Id);
            }
        }
    }
}