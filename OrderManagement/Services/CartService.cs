using MongoDB.Driver;
using OrderManagement.Models;
using OrderManagement.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement.Services
{
    public class CartService
    {
        private readonly IMongoCollection<Cart> _carts;

        public CartService(IMongoDatabase database)
        {
            _carts = database.GetCollection<Cart>("Carts");
        }

        public async Task<List<Cart>> GetCartsAsync()
        {
            return await _carts.Find(c => true).ToListAsync();
        }

        public async Task<Cart> GetCartAsync(string id)
        {
            return await _carts.Find(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateCartAsync(CreateCartDTO cartDto)
        {
            var cart = new Cart
            {
                CustomerId = cartDto.CustomerId
            };
            await _carts.InsertOneAsync(cart);
        }

        public async Task<bool> AddItemToCartAsync(string cartId, OrderItemDTO itemDto)
        {
            var update = Builders<Cart>.Update.Push(c => c.Items, itemDto);
            var result = await _carts.UpdateOneAsync(c => c.Id == cartId, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> RemoveItemFromCartAsync(string cartId, string productName)
        {
            var update = Builders<Cart>.Update.PullFilter(c => c.Items, i => i.ProductName == productName);
            var result = await _carts.UpdateOneAsync(c => c.Id == cartId, update);
            return result.ModifiedCount > 0;
        }

        public async Task DeleteCartAsync(string id)
        {
            await _carts.DeleteOneAsync(c => c.Id == id);
        }
    }
}
