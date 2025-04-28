using DeliveryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IDeliveryService
{
    //Task<Delivery> CreateDeliveryAsync(CreateDeliveryRequest request);
    Task<List<Delivery>> GetAllDeliveriesAsync();
     Task<bool> AcceptDeliveryAsync(string deliveryId, string DriverName,string DriverContact, string driverId);
    Task<bool> CompleteDeliveryAsync(string deliveryId);

    Task<List<Delivery>> GetCompletedDeliveriesAsync();

    Task<Delivery> GetDeliveryByIdAsync(string deliveryId);
    Task<List<Delivery>> GetDeliveriesByDriverId(string driverId);

    Task<string> PostDeliveryCreatebyoidresloc(string orderId, string resloc);

    Task<List<Delivery>> GetCompletedDeliveriesByUserIdAsync(string userId);

    Task<List<Delivery>> GetDeliveriesByUserIdAsync(string userId);

}
