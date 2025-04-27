using MongoDB.Driver;
using OrderManagement.Services;

var builder = WebApplication.CreateBuilder(args);

// Register MongoClient as a singleton using the connection string
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    return new MongoClient(mongoConnectionString);
});

// Register OrderService
builder.Services.AddScoped<OrderService>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Only redirect to HTTPS if NOT running in Docker
if (!IsRunningInDocker())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();
app.MapControllers();
app.Run();

// Configure the app to listen on port 8082
app.Urls.Add("http://*:8082");

// Helper function to detect Docker
bool IsRunningInDocker()
{
    return Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";
}

app.UseCors("AllowAll");