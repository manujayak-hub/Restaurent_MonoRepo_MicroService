using PaymentService.Models;
using Stripe;
using MongoDB.Driver;
using PaymentService.Services;

var builder = WebApplication.CreateBuilder(args);

// Stripe Configuration
builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"]; // Ensure this is correct

// MongoDB client configuration (Fixing the connection string reference)
builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration["MongoDB:ConnectionString"]) // Corrected this part
);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PaymentService.Services.PaymentServiceManager>();
builder.Services.AddScoped<SmsService>();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // Allow requests from any origin (you can restrict this to your frontend URL in production)
              .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
              .AllowAnyHeader();  // Allow any header
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
