namespace DeliveryService.Models
{
    public class OrderDetails
    {
        public string OrderId { get; set; }
        public string PickupLocation { get; set; }
        public string Destination { get; set; }
        public List<string> Items { get; set; }
    }
}
