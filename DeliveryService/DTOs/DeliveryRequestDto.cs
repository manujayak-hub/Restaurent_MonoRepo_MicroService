namespace DeliveryService.DTOs
{
    public class DeliveryRequestDto
    {
        public string OrderId { get; set; }
        public string RestaurantId { get; set; }
        public string PickupAddress { get; set; }
        public string DeliveryAddress { get; set; }
        public string ItemsDescription { get; set; }
    }
}
