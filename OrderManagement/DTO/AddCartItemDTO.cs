namespace OrderManagement.DTO
{
    public class AddCartItemDTO
    {
        public string CartId { get; set; }
        public OrderItemDTO Item { get; set; }
    }
}
