using System;
namespace DeliveryService.DTOs
{
    public class UpdateStatusDto
    {
        public string DeliveryId { get; set; }
        public string Status { get; set; } // PickedUp, InTransit, Delivered
    }
}
