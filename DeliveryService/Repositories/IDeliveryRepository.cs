using DeliveryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IDeliveryRepository
{
    Task CreateDeliveryAsync(Delivery delivery);
    Task<List<Delivery>> GetAllDeliveriesAsync();

    Task<Delivery> GetDeliveryByIdAsync(string deliveryId);
    Task UpdateDeliveryAsync(Delivery delivery);
    Task<List<Delivery>> GetDeliveriesByDriverId(string driverId);

    Task<List<Delivery>> GetCompletedDeliveriesByUserIdAsync(string userId);

    Task<List<Delivery>> GetDeliveriesByUserIdAsync(string userId);

    
    
}
