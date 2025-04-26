using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using MongoDB.Driver;
using RestaurantService.Entity;
namespace RestaurantService.Controllers;

public static class MenuController
{
    public static void MapMenuEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/Menu").WithTags(nameof(Menu));

        var mongoClient = routes.ServiceProvider.GetRequiredService<IMongoClient>();
        var database = mongoClient.GetDatabase("RestaurantDB");
        var collection = database.GetCollection<Menu>("Menus");

        group.MapGet("/", async () =>
        {
            var menus = await collection.Find(_ => true).ToListAsync();
            return Results.Ok(menus);
        })
        .WithName("GetAllMenus")
        .WithOpenApi();

        group.MapGet("/{id}", async (string id) =>
        {
            var menu = await collection.Find(r => r.Id == id).FirstOrDefaultAsync();
            return menu != null ? Results.Ok(menu) : Results.NotFound();
        })
        .WithName("GetMenuById")
        .WithOpenApi();

        group.MapGet("/getbyresid/{id}", async (string id) =>
        {
            var menu = await collection.Find(r => r.RestaurentId == id).ToListAsync();
            return menu != null ? Results.Ok(menu) : Results.NotFound();
        })
        .WithName("GetMenuByResId")
        .WithOpenApi();

        group.MapPost("/",async (Menu model) =>
        {
            await collection.InsertOneAsync(model);
            return Results.Created($"/Menu/{model.Id}", model);
        })
        .WithName("CreateMenu")
        .WithOpenApi();

        group.MapPut("/{id}", async (string id, Menu input) =>
        {
            var result = await collection.ReplaceOneAsync(r => r.Id == id, input);
            return result.MatchedCount > 0 ? Results.NoContent() : Results.NotFound();
        })
        .WithName("UpdateMenu")
        .WithOpenApi();

        group.MapDelete("/{id}",async (string id) =>
        {
            var result = await collection.DeleteOneAsync(r => r.Id == id);
            return result.DeletedCount > 0 ? Results.NoContent() : Results.NotFound();
        })
        .WithName("DeleteMenu")
        .WithOpenApi();
    }
}
