# Use .NET 8 SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Set the environment variable to bind to port 8082
ENV ASPNETCORE_URLS=http://+:8084

# Copy and restore
COPY *.csproj ./
RUN dotnet restore

# Copy rest and publish
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image with ASP.NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 8084

ENTRYPOINT ["dotnet", "DeliveryService.dll"]
