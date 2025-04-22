using Microsoft.AspNetCore.Mvc;
using OrderManagement.Models;
using OrderManagement.Services;
using OrderManagement.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _orderService.GetOrderAsync(id);
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] CreateOrderDTO orderDto)
        {
            try
            {
                await _orderService.CreateOrderAsync(orderDto);
                return Ok(new { message = "Order created successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrder(string id, [FromBody] Order order)
        {
            var existingOrder = await _orderService.GetOrderAsync(id);
            if (existingOrder == null)
                return NotFound(new { message = "Order not found" });

            // Update order using the ID from the URL
            order.Id = id;
            await _orderService.UpdateOrderAsync(id, order);
            return Ok(new { message = "Order successfully updated", order });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(string id)
        {
            var existingOrder = await _orderService.GetOrderAsync(id);
            if (existingOrder == null)
                return NotFound(new { message = "Order not found" });

            // Delete order using the ID from the URL
            await _orderService.DeleteOrderAsync(id);
            return Ok(new { message = "Order successfully deleted" });
        }

    }    

}