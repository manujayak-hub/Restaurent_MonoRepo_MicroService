using OrderManagement.DTO;
    public class CreateDeliveryRequest
    {
        public string CustomerId { get; set; }
        
        public string OrderId { get; set; }
        public string RestaurantId { get; set; }
        public string DeliveryLocation { get; set; }
        public string PaymentType { get; set; }

        public decimal TotalAmount { get; set; }
        public List<OrderItemDTO> Items { get; set; }
    }

