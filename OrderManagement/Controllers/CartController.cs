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

        [HttpPost]
        public async Task<ActionResult> CreateCart([FromBody] CreateCartDTO cartDto)
        {
            await _cartService.CreateCartAsync(cartDto.UserId); // << Pass only the UserId
            return Ok(new { message = "Cart created successfully" });
        }

        [HttpPost("add-item")]
        public async Task<ActionResult> AddItemToCart([FromBody] AddCartItemDTO dto)
        {
            var success = await _cartService.AddItemToCartAsync(dto.CartId, dto.Item);
            if (!success)
                return NotFound(new { message = "Cart not found" });

            return Ok(new { message = "Item added to cart" });
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
