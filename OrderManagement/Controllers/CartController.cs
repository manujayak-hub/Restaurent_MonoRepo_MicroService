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
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cart>>> GetCarts()
        {
            var carts = await _cartService.GetCartsAsync();
            return Ok(carts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(string id)
        {
            var cart = await _cartService.GetCartAsync(id);
            if (cart == null)
                return NotFound();

            return Ok(cart);
        }

       // POST: /api/Cart
        [HttpPost]
        public async Task<ActionResult> CreateCart([FromBody] CreateCartDTO cartDto)
        {
            if (cartDto == null || string.IsNullOrEmpty(cartDto.UserId))
            {
                return BadRequest(new { message = "UserId is required" });
            }

            var cart = await _cartService.GetOrCreateCartAsync(cartDto.UserId);
            
            // Return a message if the cart already exists or is newly created
            return Ok(new 
            { 
                message = cart.Items.Count == 0 ? "New cart created successfully" : "Cart already exists", 
                cart = cart 
            });
        }

        // POST: /api/Cart/add-item
        [HttpPost("add-item")]
        public async Task<ActionResult> AddItemToCart([FromBody] AddCartItemDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.CartId) || dto.Item == null)
            {
                return BadRequest(new { message = "CartId and item are required" });
            }

            var success = await _cartService.AddItemToCartAsync(dto.CartId, dto.Item);
            if (!success)
            {
                return NotFound(new { message = "Cart not found" });
            }

            return Ok(new { message = "Item added to cart successfully" });
        }

        [HttpDelete("{cartId}/remove-item/{productName}")]
        public async Task<ActionResult> RemoveItemFromCart(string cartId, string productName)
        {
            var success = await _cartService.RemoveItemFromCartAsync(cartId, productName);
            if (!success)
                return NotFound(new { message = "Cart or Item not found" });

            return Ok(new { message = "Item removed from cart" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCart(string id)
        {
            await _cartService.DeleteCartAsync(id);
            return Ok(new { message = "Cart deleted successfully" });
        }

        [HttpPost("clear/{userId}")]
        public async Task<ActionResult> ClearCart(string userId)
        {
            await _cartService.ClearCartAsync(userId);
            return Ok(new { message = "Cart cleared successfully" });
        }
    }
}
