using PaymentService.Models;
using Stripe;
using MongoDB.Driver;
using PaymentService.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("Stripe"));
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];


builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration["MongoDB:ConnectionString"])
);


builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<PaymentService.Services.PaymentServiceManager>();
builder.Services.AddScoped<SmsService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();


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
