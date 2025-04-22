namespace OrderManagement.DTO
{
    public class OrderItemDTO
    {
        public string ItemId { get; set; }
        public string Name { get; set; } // optional, for display
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}