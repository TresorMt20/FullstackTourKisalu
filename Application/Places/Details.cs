using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Places
{
    public class Details
    {
        public class Query : IRequest<Result<PlaceDto>> {public Guid Id { get; set; }}
        public class Handler : IRequestHandler<Query, Result<PlaceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               _context = context;
               _mapper = mapper;
            }
            public async Task<Result<PlaceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var place = await _context.Places
                .ProjectTo<PlaceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                 return Result<PlaceDto>.Success(place);

            }
        }
    }
}