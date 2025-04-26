using DeliveryService.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class DeliveryController : ControllerBase
{
    private readonly IDeliveryService _service;

    public DeliveryController(IDeliveryService service)
    {
        _service = service;
    }

    [HttpPost(Name = "CreateDelivery")]
    public async Task<IActionResult> CreateDelivery(CreateDeliveryRequest request)
    {
        var delivery = await _service.CreateDeliveryAsync(request);
        return Ok(delivery);
    }

    [HttpGet(Name = "GetAllDeliveries")]
    public async Task<ActionResult<List<Delivery>>> GetAllDeliveries()
    {
        return await _service.GetAllDeliveriesAsync();
    }


[HttpPut("{deliveryId}/accept")]
public async Task<IActionResult> AcceptDelivery(string deliveryId, [FromBody] Driver request)
{
    var success = await _service.AcceptDeliveryAsync(deliveryId, request.Id);

    if (!success)
    {
        return NotFound("Delivery not found or cannot be accepted.");
    }

    return Ok("Delivery accepted successfully.");
}


[HttpPut("{deliveryId}/complete")]
public async Task<IActionResult> CompleteDelivery(string deliveryId)
{
    var success = await _service.CompleteDeliveryAsync(deliveryId);
    
    if (!success)
    {
        return NotFound("Delivery not found or cannot be completed.");
    }

    return Ok("Delivery completed successfully.");
}

[HttpGet("completed")]
public async Task<ActionResult<List<Delivery>>> GetCompletedDeliveries()
{
    var deliveries = await _service.GetCompletedDeliveriesAsync();
    return Ok(deliveries);
}

[HttpGet("{deliveryId}")]
    public async Task<ActionResult<Delivery>> GetDeliveryById(string deliveryId)
    {
        var delivery = await _service.GetDeliveryByIdAsync(deliveryId);
        
        if (delivery == null)
        {
            return NotFound("Delivery not found.");
        }

        return Ok(delivery);
    }

}
