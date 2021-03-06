using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Places;
using System.Collections.Generic;
using Domain;
using System;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
  // [AllowAnonymous]
    public class PlacesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPlaces()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

         [HttpGet("{id}")]
        public async Task<IActionResult> GetPlace(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

         [HttpPost]
        public async Task<IActionResult> CreatePlace(Place Place)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Place = Place}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPlace(Guid id,Place place)
        {
            place.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Place = place}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}