using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Places
{
    public class Details
    {
        public class Query : IRequest<Result<Place>> {public Guid Id { get; set; }}
        public class Handler : IRequestHandler<Query, Result<Place>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }
            public async Task<Result<Place>> Handle(Query request, CancellationToken cancellationToken)
            {
                 return Result<Place>.Success(await _context.Places.FindAsync(request.Id));

            }
        }
    }
}