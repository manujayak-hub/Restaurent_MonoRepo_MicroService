using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PaymentService.Models
{
    public class Payment
    {
        [BsonId] // Tells MongoDB this is the _id field
        [BsonRepresentation(BsonType.ObjectId)] // Store it as an ObjectId in MongoDB
        public string Id { get; set; } // ✅ REMOVE the "= string.Empty"

        public string OrderId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string StripePaymentIntentId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
