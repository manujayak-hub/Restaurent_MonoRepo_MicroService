using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Delivery
{
      [BsonId] // Marks this as the _id field
    [BsonRepresentation(BsonType.ObjectId)] // Handles ObjectId <-> string conversion
    public string Id { get; set; }
      public string CustomerId { get; set; }
        public string OrderId { get; set; }
        public string RestaurantId { get; set; }
        public string PickupLocation { get; set; }
        public string DeliveryLocation { get; set; }
        public string DriverId { get; set; }
        public string Status { get; set; } = "Pending";
        public string PaymentType { get; set; }
         // List of items in the order for the delivery
    public List<string> OrderItems { get; set; } = new List<string>();

    // Timestamp of when the delivery was created
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Estimated delivery time (optional)
    public DateTime? EstimatedDeliveryTime { get; set; }

    // Driver's name (optional, used for showing the assigned driver)
    public string DriverName { get; set; }

    // Driver's contact number (optional, for communication purposes)
    public string DriverContact { get; set; }


}
