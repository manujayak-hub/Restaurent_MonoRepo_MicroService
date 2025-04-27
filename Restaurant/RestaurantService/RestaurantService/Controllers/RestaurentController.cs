using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using MongoDB.Driver;
using RestaurantService.Entity;

namespace RestaurantService.Controllers;

public static class RestaurentController
{
    public static void MapRestaurentEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/Restaurent").WithTags(nameof(Restaurent));

        var mongoClient = routes.ServiceProvider.GetRequiredService<IMongoClient>();
        var database = mongoClient.GetDatabase("RestaurantDB"); 
        var collection = database.GetCollection<Restaurent>("Restaurants");

        group.MapGet("/", async () =>
        {
        //    var user = KafkaUserHelper.GetUserById(userId);
        //    if (user is null) return Results.NotFound();

            var restaurants = await collection.Find(_ => true).ToListAsync();
            return Results.Ok(restaurants);
        })
        .WithName("GetAllRestaurents")
        .WithOpenApi();

        group.MapGet("/{id}", async (string id) =>
        {
            var restaurant = await collection.Find(r => r.Id == id).FirstOrDefaultAsync();
            return restaurant != null ? Results.Ok(restaurant) : Results.NotFound();
        })
        .WithName("GetRestaurentById")
        .WithOpenApi();

        group.MapGet("resowner/{id}", async (string id) =>
        {
            var user = await collection.Find(x => x.OwnerID == id).ToListAsync();
            return user != null ? Results.Ok(user) : Results.NotFound();
        })
      .WithName("GetRestaurentByowner")
      .WithOpenApi();

        group.MapPost("/", async (Restaurent model) =>
        {
            await collection.InsertOneAsync(model);
            return Results.Created($"/Restaurent/{model.Id}", model);
        })
        .WithName("CreateRestaurent")
        .WithOpenApi();

        group.MapPut("/{id}", async (string id, Restaurent input) =>
        {
            input.Id = id; // Set the ID manually before replacing
            var result = await collection.ReplaceOneAsync(r => r.Id == id, input);
            return result.MatchedCount > 0 ? Results.NoContent() : Results.NotFound();
        })
         .WithName("UpdateRestaurent")
         .WithOpenApi();


        group.MapDelete("/{id}", async (string id) =>
        {
            var result = await collection.DeleteOneAsync(r => r.Id == id);
            return result.DeletedCount > 0 ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteRestaurent")
        .WithOpenApi();
    }
}
