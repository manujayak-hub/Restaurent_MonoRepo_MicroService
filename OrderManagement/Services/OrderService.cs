using MongoDB.Driver;
using OrderManagement.Models;
using OrderManagement.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("OrderManagementDb");
            _orders = database.GetCollection<Order>("Orders");
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _orders.Find(order => true).ToListAsync();
        }

        public async Task<Order?> GetOrderAsync(string id)
        {
            return await _orders.Find(order => order.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateOrderAsync(CreateOrderDTO orderDto)
        {
            var order = new Order
            {
                CustomerId = orderDto.CustomerId,
                RestaurantId = orderDto.RestaurantId,
                Items = orderDto.Items,
                DeliveryAddress = orderDto.DeliveryAddress,
                TotalAmount = orderDto.TotalAmount,
                PaymentMethod = orderDto.PaymentMethod,
                Status = "Pending", // You can make this dynamic if needed
                CreatedAt = DateTime.UtcNow
            };

            await _orders.InsertOneAsync(order);
        }

        public async Task UpdateOrderAsync(string id, Order order)
        {
            var filter = Builders<Order>.Filter.Eq(existingOrder => existingOrder.Id, id);
            await _orders.ReplaceOneAsync(filter, order);
        }

        public async Task DeleteOrderAsync(string id)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.Id, id);
            await _orders.DeleteOneAsync(filter);
        }
    }
}
