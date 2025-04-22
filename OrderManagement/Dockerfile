# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the csproj and restore dependencies
COPY OrderManagement.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Set the environment variable to bind to port 8082
ENV ASPNETCORE_URLS=http://+:8082

# Copy the published output from build stage
COPY --from=build /app/out ./

# Expose the port your app runs on
EXPOSE 8082

# Start the app
ENTRYPOINT ["dotnet", "OrderManagement.dll"]
