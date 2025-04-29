using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using OrderManagement.DTO;
public class Delivery
{
    [BsonId] 
    [BsonRepresentation(BsonType.ObjectId)] 
    public string Id { get; set; }
    public string CustomerId { get; set; }
    public string OrderId { get; set; }
    public string RestaurantId { get; set; }
    public string PickupLocation { get; set; }
    public string DeliveryLocation { get; set; }
    public string DriverId { get; set; }
    public string Status { get; set; } = "Pending";
    public string PaymentType { get; set; }
     public List<OrderItemDTO> Items { get; set; }
    public decimal TotalAmount { get; set; }
    public string DriverName { get; set; }
    public string DriverContact { get; set; }

}
