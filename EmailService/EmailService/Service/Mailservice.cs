using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;

namespace EmailService.Service
{
    public class MailService
    {
        private readonly IConfiguration _configuration;

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Foodies", "info@Foodies.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            message.Body = new TextPart("plain")
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);

                // Authenticate if needed
                client.Authenticate("s1.se.we.35@gmail.com", "cknj tkuc sujj jrgw");

                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
