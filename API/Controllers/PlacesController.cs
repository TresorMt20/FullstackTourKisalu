using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Places;
using System.Collections.Generic;
using Domain;
using System;

namespace API.Controllers
{
    public class PlacesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Place>>> GetPlaces()
        {
            return await Mediator.Send(new List.Query());
        }

         [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetPlace(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
         [HttpPost]
        public async Task<ActionResult<Unit>> CreatePlace(Place Place)
        {
            return await Mediator.Send(new Create.Command{Place = Place});
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPlace(Guid id,Place place)
        {
            place.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Place = place}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}