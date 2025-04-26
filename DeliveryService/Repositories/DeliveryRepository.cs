using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace DeliveryService.Repositories
{
    public class DeliveryRepository
    {
        private readonly IMongoCollection<Delivery> _deliveries;

        public DeliveryRepository(IConfiguration config)
        {
            var connectionString = config.GetSection("MongoDb:ConnectionString").Value;
            var databaseName = config.GetSection("MongoDb:DatabaseName").Value;
            var collectionName = config.GetSection("MongoDb:CollectionName").Value;

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _deliveries = database.GetCollection<Delivery>(collectionName);
        }

        public async Task<List<Delivery>> GetPendingDeliveriesAsync() =>
            await _deliveries.Find(d => d.Status == "Pending").ToListAsync();

        public async Task<Delivery> GetDeliveryByIdAsync(string id) =>
            await _deliveries.Find(d => d.Id == id).FirstOrDefaultAsync();

        public async Task<Delivery> GetActiveDeliveryByDriverIdAsync(string driverId) =>
            await _deliveries.Find(d => d.DriverId == driverId && d.Status != "Delivered").FirstOrDefaultAsync();

        public async Task CreateAsync(Delivery delivery) =>
            await _deliveries.InsertOneAsync(delivery);

        public async Task UpdateAsync(Delivery delivery) =>
            await _deliveries.ReplaceOneAsync(d => d.Id == delivery.Id, delivery);


    }
}
