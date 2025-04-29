using Microsoft.AspNetCore.Mvc;
using PaymentService.Services;

namespace PaymentService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SmsController : ControllerBase
    {
        private readonly SmsService _smsService;

        public SmsController(SmsService smsService)
        {
            _smsService = smsService;
        }

        [HttpPost("send-receipt")]
        public IActionResult SendReceipt([FromBody] PaymentRequest paymentRequest)
        {
            try
            {
                string message = $"Your payment of ${paymentRequest.Amount} was successfully Paid. Thank you! ";
                _smsService.SendSms(paymentRequest.PhoneNumber, message);

                return Ok(new { success = true, message = "Receipt sent to mobile number." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }

    public class PaymentRequest
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
