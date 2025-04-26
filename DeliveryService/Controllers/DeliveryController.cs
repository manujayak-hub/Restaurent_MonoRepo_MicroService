
using DeliveryService.DTOs;


using Microsoft.AspNetCore.Mvc;
using DeliverySvc = DeliveryService.Services.DeliveryService;

namespace DeliveryService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryController : ControllerBase
    {
        private readonly DeliverySvc _service;

        public DeliveryController(DeliverySvc service)
        {
            _service = service;
        }

        [HttpPost("receive-from-order")]
        public async Task<IActionResult> ReceiveDeliveryFromOrder([FromBody] DeliveryRequestDto request)
        {
            var httpClient = new HttpClient();

            // Fetching order details from the Order microservice using OrderId
            var orderResponse = await httpClient.GetAsync($"http://orderservice/api/orders/{request.OrderId}");

            if (!orderResponse.IsSuccessStatusCode)
            {
                return BadRequest("Order not found or unable to fetch order details.");
            }

            // Deserialize order details
            var orderJson = await orderResponse.Content.ReadAsStringAsync();
            var orderDetails = Newtonsoft.Json.JsonConvert.DeserializeObject<DeliveryRequestDto>(orderJson);

            // Create a Delivery object based on Order details
            var delivery = new Delivery
            {
                OrderId = request.OrderId, // Received from the request body
                RestaurantId = orderDetails.RestaurantId, // Assuming this exists in the Order service
                PickupAddress = orderDetails.PickupAddress, // Assuming this exists in the Order service
                DeliveryAddress = request.DeliveryAddress, // You can still use the provided delivery address
                ItemsDescription = orderDetails.ItemsDescription, // Items list from the order
                Status = "Pending"
            };

            // Save the delivery in the Delivery microservice
            var id = await _service.ReceiveDeliveryAsync(delivery);

            // Broadcast logic (notify nearby drivers)
            await _service.BroadcastToDriversAsync(delivery);

            // Return the response
            return Ok(new { DeliveryId = id });
        }


        [HttpPost("accept/{deliveryId}")]
        public async Task<IActionResult> AcceptDelivery(string deliveryId, [FromQuery] string driverId)
        {
            var delivery = await _service.AcceptDeliveryAsync(deliveryId, driverId);
            if (delivery == null) return BadRequest("Cannot accept delivery. Already assigned or invalid.");

            return Ok(new DeliveryResponseDto
            {
                DeliveryId = delivery.Id,
                PickupAddress = delivery.PickupAddress,
                DeliveryAddress = delivery.DeliveryAddress,
                ItemsDescription = delivery.ItemsDescription,
                Status = delivery.Status
            });
        }

        [HttpPost("complete")]
        public async Task<IActionResult> CompleteDelivery([FromBody] CompleteDeliveryDto dto)
        {
            var result = await _service.CompleteDeliveryAsync(dto.DeliveryId, dto.PaymentType);
            if (!result) return BadRequest("Delivery could not be completed.");

            return Ok("Delivery completed and admin notified.");
        }

        [HttpPost("status")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
        {
            var result = await _service.UpdateStatusAsync(dto.DeliveryId, dto.Status);
            if (!result) return BadRequest("Could not update status.");

            return Ok("Status updated.");
        }

        // New endpoint to notify the driver
        [HttpPost("notify-driver")]
        public async Task<IActionResult> NotifyDriver([FromBody] NotifyDriverDto notification)
        {
            // Log the notification (or add actual sending logic here)
            Console.WriteLine($"[INFO] Notification sent to Driver {notification.DriverId}: {Newtonsoft.Json.JsonConvert.SerializeObject(notification)}");

            // Optionally send this to a real external service like Email/SMS, etc.
            // If we are just mocking it, we can return a simple OK response.
            return Ok("Notification sent to driver.");
        }
    }

}
