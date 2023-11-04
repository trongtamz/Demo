using Demo.Api.Extensions;
using Demo.Application.Endpoints.People.Commands;
using Demo.Application.Endpoints.People.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Demo.Api.Controllers;

[ApiController]
[Route("api/sas-token")]
public class SasTokenController : ControllerBase
{
    private readonly IMediator _mediator;

    public SasTokenController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<string> GetSASToken([FromQuery] SasTokenQuery request)
    {
        var response = await _mediator.Send(request);
        return response;
    }

    //(await _mediator.Send(request)));

    [HttpPost]
    public async Task<ActionResult> AddPersonAsync([FromBody] AddPersonCommand command) =>
        (await _mediator.Send(command)).ToActionResult();
}
