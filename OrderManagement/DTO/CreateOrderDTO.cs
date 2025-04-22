namespace OrderManagement.DTO
{
    public class CreateOrderDTO
    {
        public string CustomerId { get; set; } //test customer id
        public string RestaurantId { get; set; }
        public List<OrderItemDTO> Items { get; set; }
        public string DeliveryAddress { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; } 
    }
}
