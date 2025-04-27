using DeliveryService.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

namespace DeliveryService.Services // ✅ Add this
{
public class DeliveryService : IDeliveryService
{
    private readonly IDeliveryRepository _repository;
    private readonly HttpClient _httpClient;
    private readonly IHttpClientFactory _httpClientFactory;

    public DeliveryService(IDeliveryRepository repository, IHttpClientFactory factory,IHttpClientFactory httpClientFactory)
    {
        _repository = repository;
        _httpClient = factory.CreateClient();
        _httpClientFactory = httpClientFactory;
    }

    // public async Task<Delivery> CreateDeliveryAsync(CreateDeliveryRequest request)
    // {
        
        

    //     var delivery = new Delivery
    //     {
    //         OrderId = request.OrderId,
    //         CustomerId = request.CustomerId,
    //         RestaurantId = request.RestaurantId,
    //         PickupLocation = request.PickupLocation,//restaurant.location,
    //         DeliveryLocation = request.DeliveryLocation,
    //         PaymentType = request.PaymentType,
    //         Items = request.Items,
    //         TotalAmount = request.TotalAmount
    //     };

    //     await _repository.CreateDeliveryAsync(delivery);
    //     return delivery;
    // }

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
public async Task<string> PostDeliveryCreatebyoidresloc(string orderId, string resloc)
{
    // Use the HttpClient to call the external API
    var client = _httpClientFactory.CreateClient();

    // Example API URL (replace with the actual URL and parameters)
    var apiUrl = $"http://localhost:5112/api/Order/{orderId}";

    var response = await client.GetAsync(apiUrl);

    if (!response.IsSuccessStatusCode)
    {
        // Handle error (throw, return a default value, etc.)
        throw new Exception("Failed to fetch restaurant location");
    }

    var content = await response.Content.ReadAsStringAsync();

    // Deserialize the JSON response into an object
    var order = JsonConvert.DeserializeObject<CreateDeliveryRequest>(content);

    if (order != null)
    {
        // Map fields from the deserialized order object to the Delivery object
        var delivery = new Delivery
        {
            OrderId = order.Id, // Note: Mapping 'Id' to 'OrderId'
            CustomerId = order.CustomerId,
            RestaurantId = order.RestaurantId,
            PickupLocation = resloc, // Use the 'resloc' passed to the method
            DeliveryLocation = order.DeliveryAddress, // Assuming 'DeliveryAddress' is where the delivery will occur
            PaymentType = order.PaymentMethod, // Use PaymentMethod from the response
            Items = order.Items,
            TotalAmount = order.TotalAmount
        };

        // Save the delivery to the repository
        await _repository.CreateDeliveryAsync(delivery);
    }

    return "done";
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