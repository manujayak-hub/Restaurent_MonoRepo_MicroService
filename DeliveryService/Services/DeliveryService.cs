using DeliveryService.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

namespace DeliveryService.Services // ✅ Add this
{
public class DeliveryService : IDeliveryService
{
    private readonly IDeliveryRepository _repository;
    private readonly HttpClient _httpClient;

    public DeliveryService(IDeliveryRepository repository, IHttpClientFactory factory)
    {
        _repository = repository;
        _httpClient = factory.CreateClient();
    }

    public async Task<Delivery> CreateDeliveryAsync(CreateDeliveryRequest request)
    {
        // Fetch restaurant location
        // var response = await _httpClient.GetAsync($"http://localhost:5177/api/Restaurent/{request.RestaurantId}");
        // response.EnsureSuccessStatusCode();
        // var json = await response.Content.ReadAsStringAsync();
        // dynamic restaurant = JsonConvert.DeserializeObject(json);
        var restaurantLocation = "Kottawa";

        var delivery = new Delivery
        {
            OrderId = request.OrderId,
            CustomerId = request.CustomerId,
            RestaurantId = request.RestaurantId,
            PickupLocation = restaurantLocation,//restaurant.location,
            DeliveryLocation = request.DeliveryLocation,
            PaymentType = request.PaymentType,
            Items = request.Items,
            TotalAmount = request.TotalAmount
        };

        await _repository.CreateDeliveryAsync(delivery);
        return delivery;
    }

    public async Task<List<Delivery>> GetAllDeliveriesAsync()
    {
        return await _repository.GetAllDeliveriesAsync();
    }

    public async Task<bool> AcceptDeliveryAsync(string deliveryId, string driverId,string DriverName,string DriverContact)
{
    var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
    
    if (delivery == null || delivery.Status != "Pending") 
    {
        // You can throw an exception or return false if the delivery is not available to accept.
        return false;
    }

    // Update delivery status to 'Accepted' and assign driver
    delivery.Status = "Accepted";
    delivery.DriverId = driverId;
    delivery.DriverName = DriverName;
    delivery.DriverContact = DriverContact;
    await _repository.UpdateDeliveryAsync(delivery);
    return true;
}

public async Task<bool> CompleteDeliveryAsync(string deliveryId)
{
    var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);

    if (delivery == null || delivery.Status != "Accepted")
    {
        // Return false if the delivery is not in 'Accepted' state or doesn't exist
        return false;
    }

    // Update the status to 'Completed' and optionally store the completion time
    delivery.Status = "Completed";
    await _repository.UpdateDeliveryAsync(delivery);
    return true;
}

public async Task<List<Delivery>> GetCompletedDeliveriesAsync()
{
    var allDeliveries = await _repository.GetAllDeliveriesAsync();
    return allDeliveries
        .Where(d => d.Status == "Completed")
        .ToList();
}

public async Task<Delivery> GetDeliveryByIdAsync(string deliveryId)
        {
            var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
            return delivery;
        }
  
public async Task<List<Delivery>> GetDeliveriesByDriverId(string driverId)
        {
            // Fetch deliveries assigned to the driver from the repository
            return await _repository.GetDeliveriesByDriverId(driverId);
        }

}
}