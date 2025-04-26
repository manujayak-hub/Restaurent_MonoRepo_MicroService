namespace RestaurantService.Entity
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    public class Restaurent
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        [BsonElement("ownername")]
        public string OwnerName { get; set; } = null!;

        [BsonElement("ownerid")]
        public string OwnerID { get; set; } = null!;

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("address")]
        public string Address { get; set; } = null!;

        [BsonElement("contactNumber")]
        public string ContactNumber { get; set; } = null!;

        [BsonElement("rating")]
        public double Rating { get; set; }

        [BsonElement("cuisine")]
        public string Cuisine { get; set; } = null!;

        [BsonElement("isOpen")]
        public bool IsOpen { get; set; }

        [BsonElement("createdAt")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
