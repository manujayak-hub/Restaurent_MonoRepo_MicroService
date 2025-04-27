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

        [HttpGet("status/{status}/{id}")]
        public async Task<ActionResult<Order>> GetOrderByStatusAndRestaurantId(string status, string id)
        {
            var order = await _orderService.GetOrderByStatusAndRestaurantIdAsync(status, id);
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<Order>> GetOrderByStatus(string status)
        {
            var order = await _orderService.GetOrderByStatusAsync(status);
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

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateOrderStatus(string id, [FromQuery] string recordstatus)
        {
            var existingOrder = await _orderService.GetOrderAsync(id);
            if (existingOrder == null)
                return NotFound(new { message = "Order not found" });

            await _orderService.UpdateOrderStatusAsync(id, recordstatus);

            return Ok(new { message = "Order successfully updated" });
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
        //Get orders by Customer ID
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByCustomerId(string customerId)
        {
            var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
            if (orders == null || orders.Count == 0)
                return NotFound(new { message = "No orders found for this customer" });

            return Ok(orders);
        }

        //Get orders by Restaurant ID
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByRestaurantId(string restaurantId)
        {
            var orders = await _orderService.GetOrdersByRestaurantIdAsync(restaurantId);
            if (orders == null || orders.Count == 0)
                return NotFound(new { message = "No orders found for this restaurant" });

            return Ok(orders);
        }

        //Get orders by Customer ID
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByCustomerId(string customerId)
        {
            var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
            if (orders == null || orders.Count == 0)
                return NotFound(new { message = "No orders found for this customer" });

            return Ok(orders);
        }

        //Get orders by Restaurant ID
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByRestaurantId(string restaurantId)
        {
            var orders = await _orderService.GetOrdersByRestaurantIdAsync(restaurantId);
            if (orders == null || orders.Count == 0)
                return NotFound(new { message = "No orders found for this restaurant" });

            return Ok(orders);
        }

    }    

}