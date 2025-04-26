
using DeliveryService.Services;
using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Retrieve MongoDB settings from appsettings.json
var mongoSettings = builder.Configuration.GetSection("MongoDb");
var mongoConnectionString = mongoSettings.GetValue<string>("ConnectionString");
var mongoDatabaseName = mongoSettings.GetValue<string>("DatabaseName");

// Log MongoDB settings for debugging
Console.WriteLine($"MongoDB Connection String: {mongoConnectionString}");
Console.WriteLine($"MongoDB Database Name: {mongoDatabaseName}");

try
{
    // Create MongoDB client
    var mongoClient = new MongoClient(mongoConnectionString);
    var database = mongoClient.GetDatabase(mongoDatabaseName);

    

    Console.WriteLine("✅ MongoDB connection successful and test document inserted.");
}
catch (Exception ex)
{
    Console.WriteLine("❌ MongoDB connection failed: " + ex.Message);
}

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Allow requests from any origin (you can restrict this to your frontend URL in production)
              .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader();  // Allow any header
    });
});

builder.Services.AddHttpClient();
builder.Services.AddScoped<IDeliveryRepository, DeliveryRepository>();
builder.Services.AddScoped<IDeliveryService, DeliveryService.Services.DeliveryService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS policy before any other middleware
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
