using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using OrderManagement.DTO;

namespace OrderManagement.Models
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string UserId { get; set; }  // User ID of the customer who owns the cart
        public List<OrderItemDTO> Items { get; set; } = new List<OrderItemDTO>();
    }
}
