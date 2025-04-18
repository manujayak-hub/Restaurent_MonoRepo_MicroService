﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using MongoDB.Driver;
using RestaurantService.Entity;

namespace RestaurantService.Controllers;

public static class RestaurentController
{
    public static void MapRestaurentEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Restaurent").WithTags(nameof(Restaurent));

        var mongoClient = routes.ServiceProvider.GetRequiredService<IMongoClient>();
        var database = mongoClient.GetDatabase("RestaurantDB"); // Change DB name if needed
        var collection = database.GetCollection<Restaurent>("Restaurants");

        group.MapGet("/", async () =>
        {
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

        group.MapPost("/", async (Restaurent model) =>
        {
            await collection.InsertOneAsync(model);
            return Results.Created($"/api/Restaurent/{model.Id}", model);
        })
        .WithName("CreateRestaurent")
        .WithOpenApi();

        group.MapPut("/{id}", async (string id, Restaurent input) =>
        {
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
