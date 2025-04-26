using DeliveryService.DTOs;
using Newtonsoft.Json.Linq;
using DeliveryService.Repositories;
using MongoDB.Bson.IO;
using Newtonsoft.Json;


namespace DeliveryService.Services
{
    public class DeliveryService
    {
        private readonly DeliveryRepository _repository;
        private readonly string googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";


        public DeliveryService(DeliveryRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> ReceiveDeliveryAsync(Delivery delivery)
        {
            await _repository.CreateAsync(delivery);
            return delivery.Id;
        }


        public async Task BroadcastToDriversAsync(Delivery delivery)
        {
            List<DriverDto> drivers;

            try
            {
                var httpClient = new HttpClient();
                var response = await httpClient.GetAsync("http://usermanagement/api/drivers/available");

                if (response.IsSuccessStatusCode)
                {
                    var driverListJson = await response.Content.ReadAsStringAsync();
                    drivers = Newtonsoft.Json.JsonConvert.DeserializeObject<List<DriverDto>>(driverListJson);
                }
                else
                {
                    Console.WriteLine("[WARN] User Management API call failed. Using mock drivers.");
                    drivers = GetMockDrivers();
                }

                // ✅ Use Google Maps to filter nearby drivers
                var nearbyDrivers = await FilterNearbyDriversAsync(drivers, delivery.PickupAddress);

                foreach (var driver in nearbyDrivers)
                {
                    var notification = new
                    {
                        DriverId = driver.Id,
                        DeliveryId = delivery.Id,
                        PickupAddress = delivery.PickupAddress,
                        Message = "New delivery nearby!"
                    };

                    // Call the new API to notify the driver
                    var notifyResponse = await httpClient.PostAsJsonAsync("http://localhost:5272/api/delivery/notify-driver", notification);
                    if (notifyResponse.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"[INFO] Notification sent to Driver {driver.Id} – Status: {notifyResponse.StatusCode}");
                    }
                    else
                    {
                        Console.WriteLine($"[ERROR] Failed to notify Driver {driver.Id}. Status: {notifyResponse.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Could not broadcast delivery: {ex.Message}");
            }
        }

        private List<DriverDto> GetMockDrivers()
        {
            return new List<DriverDto>
            {
                new DriverDto { Id = "driver001", CurrentLocation = "Colombo" },
                new DriverDto { Id = "driver002", CurrentLocation = "Nugegoda" },
                new DriverDto { Id = "driver003", CurrentLocation = "Kandy" }
            };
        }

        // ✅ Real version using Google Distance Matrix API
        private async Task<List<DriverDto>> FilterNearbyDriversAsync(List<DriverDto> drivers, string pickupAddress)
        {
            var httpClient = new HttpClient();
            var destinations = string.Join("|", drivers.Select(d => Uri.EscapeDataString(d.CurrentLocation)));

            string requestUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?" +
                                $"origins={Uri.EscapeDataString(pickupAddress)}" +
                                $"&destinations={destinations}" +
                                $"&key={googleMapsApiKey}";

            var response = await httpClient.GetStringAsync(requestUrl);
            var json = JObject.Parse(response);

            var elements = json["rows"][0]["elements"];
            var nearbyDrivers = new List<DriverDto>();

            for (int i = 0; i < elements.Count(); i++)
            {
                var element = elements[i];
                if (element["status"]?.ToString() == "OK")
                {
                    int distanceInMeters = (int)element["distance"]["value"];
                    if (distanceInMeters <= 5000) // 5 km
                    {
                        nearbyDrivers.Add(drivers[i]);
                    }
                }
            }

            return nearbyDrivers;
        }


        //public async Task<List<DriverDto>> FilterNearbyDriversAsync(List<DriverDto> drivers, string pickupAddress)
        //{
        //    string apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

        //    // Combine driver locations into pipe-separated list
        //    var destinations = string.Join("|", drivers.Select(d => Uri.EscapeDataString(d.CurrentLocation)));

        //    string requestUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?" +
        //                        $"origins={Uri.EscapeDataString(pickupAddress)}" +
        //                        $"&destinations={destinations}" +
        //                        $"&key={apiKey}";

        //    var httpClient = new HttpClient();
        //    var response = await httpClient.GetStringAsync(requestUrl);
        //    var json = JObject.Parse(response);

        //    var elements = json["rows"][0]["elements"];
        //    var nearbyDrivers = new List<DriverDto>();

        //    for (int i = 0; i < elements.Count(); i++)
        //    {
        //        var element = elements[i];
        //        if (element["status"].ToString() == "OK")
        //        {
        //            int distanceInMeters = (int)element["distance"]["value"];
        //            if (distanceInMeters <= 5000) // within 5km
        //            {
        //                nearbyDrivers.Add(drivers[i]);
        //            }
        //        }
        //    }

        //    return nearbyDrivers;
        //}


        public async Task<Delivery> AcceptDeliveryAsync(string deliveryId, string driverId)
        {
            var active = await _repository.GetActiveDeliveryByDriverIdAsync(driverId);
            if (active != null) return null;

            var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
            if (delivery == null || delivery.Status != "Pending") return null;

            delivery.DriverId = driverId;
            delivery.Status = "Accepted";
            await _repository.UpdateAsync(delivery);

            return delivery;
        }

        public async Task<bool> CompleteDeliveryAsync(string deliveryId, string paymentType)
        {
            var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
            if (delivery == null || delivery.Status == "Delivered") return false;

            delivery.Status = "Delivered";
            delivery.PaymentType = paymentType;
            await _repository.UpdateAsync(delivery);

            // Notify admin logic here
            Console.WriteLine($"Admin notified: Delivery {deliveryId} completed with {paymentType} payment.");
            return true;
        }

        public async Task<bool> UpdateStatusAsync(string deliveryId, string status)
        {
            var delivery = await _repository.GetDeliveryByIdAsync(deliveryId);
            if (delivery == null || delivery.Status == "Delivered") return false;

            delivery.Status = status;
            await _repository.UpdateAsync(delivery);
            return true;
        }

    }
}
