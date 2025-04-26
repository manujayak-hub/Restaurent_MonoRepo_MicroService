using DeliveryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IDeliveryService
{
    Task<Delivery> CreateDeliveryAsync(CreateDeliveryRequest request);
    Task<List<Delivery>> GetAllDeliveriesAsync();
     Task<bool> AcceptDeliveryAsync(string deliveryId, string driverId);
    Task<bool> CompleteDeliveryAsync(string deliveryId);

    Task<List<Delivery>> GetCompletedDeliveriesAsync();

    Task<Delivery> GetDeliveryByIdAsync(string deliveryId);

}
