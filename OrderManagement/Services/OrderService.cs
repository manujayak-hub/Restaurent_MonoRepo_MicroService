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
            // Set the status based on payment method
            string status = orderDto.PaymentMethod == "cashOnDelivery" ? "Paid" : "Pending";

            var order = new Order
            {
                CustomerId = orderDto.CustomerId,
                RestaurantId = orderDto.RestaurantId,
                Items = orderDto.Items,
                DeliveryAddress = orderDto.DeliveryAddress,
                TotalAmount = orderDto.TotalAmount,
                PaymentMethod = orderDto.PaymentMethod,
                Status = status, // Set the status here
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

         public async Task<List<Order>> GetOrdersByRestaurantIdAsync(string restaurantId)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.RestaurantId, restaurantId);
            return await _orders.Find(filter).ToListAsync();
        }
        public async Task<List<Order>> GetOrdersByCustomerIdAsync(string customerId)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.CustomerId, customerId);
            return await _orders.Find(filter).ToListAsync();
        }


        // Update ONLY the Status field
        public async Task UpdateOrderStatusAsync(string id, string recordStatus)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.Id, id);
            var update = Builders<Order>.Update.Set(order => order.Status, recordStatus);

            await _orders.UpdateOneAsync(filter, update);
        }

        // Get Orders by Status and RestaurantId
public async Task<List<Order>> GetOrdersByStatusAndRestaurantIdAsync(string status, string restaurantId)
{
    var filter = Builders<Order>.Filter.Eq(order => order.Status, status) &
                Builders<Order>.Filter.Eq(order => order.RestaurantId, restaurantId);
                
    return await _orders.Find(filter).ToListAsync();
}

    // Get Orders by Status only
    public async Task<List<Order>> GetOrdersByStatusAsync(string status)
    {
        var filter = Builders<Order>.Filter.Eq(order => order.Status, status);

        return await _orders.Find(filter).ToListAsync();


        }    
    }
}
