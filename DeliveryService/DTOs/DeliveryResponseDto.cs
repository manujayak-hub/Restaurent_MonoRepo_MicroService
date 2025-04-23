namespace DeliveryService.DTOs
{
    public class DeliveryResponseDto
    {
        public string DeliveryId { get; set; }
        public string PickupAddress { get; set; }
        public string DeliveryAddress { get; set; }
        public string ItemsDescription { get; set; }
        public string Status { get; set; }
        public string Route { get; set; }
    }
}
