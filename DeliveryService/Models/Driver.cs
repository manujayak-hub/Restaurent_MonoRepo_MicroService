namespace DeliveryService.Models
{
    public class Driver
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string CurrentLocation { get; set; }
        public bool IsAvailable { get; set; }
    }
}
