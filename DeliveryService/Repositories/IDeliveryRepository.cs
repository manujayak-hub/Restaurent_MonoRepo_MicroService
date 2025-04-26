using DeliveryService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IDeliveryRepository
{
    Task CreateDeliveryAsync(Delivery delivery);
    Task<List<Delivery>> GetAllDeliveriesAsync();

    Task<Delivery> GetDeliveryByIdAsync(string deliveryId);
    Task UpdateDeliveryAsync(Delivery delivery);

    
}
