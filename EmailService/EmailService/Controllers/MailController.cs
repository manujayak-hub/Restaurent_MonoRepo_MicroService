using Microsoft.AspNetCore.Mvc;
using EmailService.Service;

namespace EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly MailService _mailService;

        public EmailController(MailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            _mailService.SendEmail(request.ToEmail, request.Subject, request.Body);
            return Ok("Email sent successfully!");
        }
    }

    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
