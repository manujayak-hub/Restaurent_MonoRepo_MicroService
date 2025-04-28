namespace PaymentService.Models
{
    public class PaymentIntentRequest
    {
        public long Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string PaymentMethodType { get; set; } = string.Empty;
    }
}
