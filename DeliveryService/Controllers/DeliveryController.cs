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

    [HttpPost(Name = "PostDeliveryCreatebyoidresloc")]
    public async Task<IActionResult> PostDeliveryCreatebyoidresloc(string orderId, string resloc)
    {
        var delivery = await _service.PostDeliveryCreatebyoidresloc(orderId, resloc);
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
    var success = await _service.AcceptDeliveryAsync(deliveryId, request.DriverId,request.DriverName,request.DriverContact);

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

// GET: api/delivery/driver/{driverId}
        [HttpGet("driver/{driverId}")]
        public async Task<ActionResult<IEnumerable<Delivery>>> GetDeliveriesByDriverId(string driverId)
        {
            var deliveries = await _service.GetDeliveriesByDriverId(driverId);
            
            if (deliveries == null || deliveries.Count == 0)
            {
                return NotFound("No deliveries found for this driver.");
            }

            return Ok(deliveries);
        }

        [HttpGet("completed/{userId}")]
        public async Task<IActionResult> GetCompletedDeliveries(string userId)
        {
            try
            {
                var deliveries = await _service.GetCompletedDeliveriesByUserIdAsync(userId);
                
                if (deliveries == null || deliveries.Count == 0)
                {
                    return Ok(new List<Delivery>());
                }

                return Ok(deliveries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
         [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Delivery>>> GetDeliveriesByUserId(string userId)
        {
            var deliveries = await _service.GetDeliveriesByUserIdAsync(userId);

            if (deliveries == null || deliveries.Count == 0)
            {
                return NotFound("No active deliveries found for this user.");
            }

            return Ok(deliveries);
        }
}
