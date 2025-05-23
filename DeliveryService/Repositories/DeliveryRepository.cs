﻿using DeliveryService.Models;
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
                    .Set(d => d.DriverId, delivery.DriverId)
                    .Set(d => d.DriverName, delivery.DriverName)
                    .Set(d => d.DriverContact, delivery.DriverContact);

        await _collection.UpdateOneAsync(filter, update);
    }
    public async Task<List<Delivery>> GetDeliveriesByDriverId(string driverId)
        {
           
            var filter = Builders<Delivery>.Filter.Eq(d => d.DriverId, driverId);
            return await _collection.Find(filter).ToListAsync();
        }

    public async Task<List<Delivery>> GetCompletedDeliveriesByUserIdAsync(string userId)
    {
        var filter = Builders<Delivery>.Filter.And(
            Builders<Delivery>.Filter.Eq(d => d.CustomerId, userId),
            Builders<Delivery>.Filter.Eq(d => d.Status, "Completed")
        );

        return await _collection.Find(filter).ToListAsync();
    }

    public async Task<List<Delivery>> GetDeliveriesByUserIdAsync(string userId)
    {
        // Fetch active deliveries for a specific user
        var filter = Builders<Delivery>.Filter.And(
            Builders<Delivery>.Filter.Eq(d => d.CustomerId, userId)
        );

        return await _collection.Find(filter).ToListAsync();
    }

    
}
