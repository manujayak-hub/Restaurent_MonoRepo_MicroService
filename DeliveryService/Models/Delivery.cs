using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Delivery
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string OrderId { get; set; }
    public string DriverId { get; set; }
    public string RestaurantId { get; set; }
    public string PickupAddress { get; set; }
    public string DeliveryAddress { get; set; }
    public string ItemsDescription { get; set; }
    public string Status { get; set; } // Pending, Accepted, PickedUp, InTransit, Delivered
    public string PaymentType { get; set; } // Cash or Online


}
