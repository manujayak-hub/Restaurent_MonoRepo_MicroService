namespace RestaurantService.Entity
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    public class Menu
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        [BsonElement("dishname")]
        public string DishName { get; set; } = null!;

        [BsonElement("ingredient")]
        public string Ingredient { get; set; } = null!;

        [BsonElement("imgurl")]
        public string ImgUrl { get; set; } = null!;

        [BsonElement("rating")]
        public string Rating { get; set; } = null!;

        [BsonElement("price")]
        public string Price { get; set; } = null!;

        [BsonElement("vegnonveg")]
        public double VegNonveg { get; set; }

        [BsonElement("restaurentid")]
        public string RestaurentId { get; set; }

        [BsonElement("createdAt")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
