using DeliveryService.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DeliveryRepository : IDeliveryRepository
{
    private readonly IMongoCollection<Delivery> _collection;

    public DeliveryRepository(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _collection = database.GetCollection<Delivery>("Deliveries");
    }

    public async Task CreateDeliveryAsync(Delivery delivery)
    {
        await _collection.InsertOneAsync(delivery);
    }

    public async Task<List<Delivery>> GetAllDeliveriesAsync()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }

    public async Task<Delivery> GetDeliveryByIdAsync(string deliveryId)
{
    var filter = Builders<Delivery>.Filter.Eq(d => d.Id, deliveryId);
    return await _collection.Find(filter).FirstOrDefaultAsync();
}

public async Task UpdateDeliveryAsync(Delivery delivery)
{
    var filter = Builders<Delivery>.Filter.Eq(d => d.Id, delivery.Id);
    var update = Builders<Delivery>.Update
                .Set(d => d.Status, delivery.Status)
                .Set(d => d.DriverId, delivery.DriverId);

    await _collection.UpdateOneAsync(filter, update);
}


}
