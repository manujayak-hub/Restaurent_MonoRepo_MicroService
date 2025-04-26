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

        public CartService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("OrderManagementDb");
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

        public async Task<Cart> GetOrCreateCartAsync(string userId)
        {
            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    Items = new List<OrderItemDTO>()
                };
                await _carts.InsertOneAsync(cart);
            }
            return cart;
        }

        public async Task<bool> AddItemToCartAsync(string cartId, OrderItemDTO itemDto)
        {
            var update = Builders<Cart>.Update.Push(c => c.Items, itemDto);
            var result = await _carts.UpdateOneAsync(c => c.Id == cartId, update);
            return result.ModifiedCount > 0;
        }

       public async Task<bool> RemoveItemFromCartAsync(string cartId, string itemId)
    {
        var update = Builders<Cart>.Update.PullFilter(c => c.Items, i => i.ItemId == itemId);
        var result = await _carts.UpdateOneAsync(c => c.Id == cartId, update);
        return result.ModifiedCount > 0;
    }


        public async Task DeleteCartAsync(string id)
        {
            await _carts.DeleteOneAsync(c => c.Id == id);
        }

        public async Task ClearCartAsync(string userId)
        {
            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
            if (cart != null)
            {
                var update = Builders<Cart>.Update.Set(c => c.Items, new List<OrderItemDTO>());
                await _carts.UpdateOneAsync(c => c.Id == cart.Id, update);
            }
        }

        public async Task<Cart> CreateCartAsync(string userId)
        {
            var cart = new Cart
            {
                UserId = userId,
                Items = new List<OrderItemDTO>()
            };
            await _carts.InsertOneAsync(cart);
            return cart;
        }


    }
}
