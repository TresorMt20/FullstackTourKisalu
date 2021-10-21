using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Places
{
    public class List
    {
        public class Query:IRequest<List<Place>>{}

        public class Handler : IRequestHandler<Query, List<Place>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Place>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Places.ToListAsync();
            }
        }
    }
}