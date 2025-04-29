# Restaurent_MonoRepo_MicroService
# 🍽️ Foody Food Delivery App

A microservices-based food delivery application built with Node.js, .NET, and React (Vite). Each service runs independently and is containerized using Docker.

---

## 🧩 Microservices Overview

| Port  | Service        | Technology | Description                    |
|-------|----------------|------------|--------------------------------|
| 8080  | Authentication | Node.js    | Handles user login, registration, and token issuance |
| 8081  | Restaurant     | .NET       | Manages restaurant listings and data |
| 8082  | Order          | .NET       | Handles order creation, tracking, and history |
| 8083  | Payment        | .NET       | Manages payment processing and billing |
| 8084  | Delivery       | .NET       | Handles delivery management and status |
| 8085  | Email          | .NET       | Sends order and account-related emails |
| 5173  | Frontend       | React (Vite) | User interface for the food ordering app |

---

## 🚀 Running the Project with Docker

Make sure Docker and Docker Compose are installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/foody-app.git
cd foody-app

foody-app/
│
├── auth-service/            # Node.js Auth service (port 8080)
├── restaurant-service/      # .NET Restaurant service (port 8081)
├── order-service/           # .NET Order service (port 8082)
├── payment-service/         # .NET Payment service (port 8083)
├── delivery-service/        # .NET Delivery service (port 8084)
├── email-service/           # .NET Email service (port 8085)
├── frontend/                # React Vite frontend (port 5173)
├── docker-compose.yml
└── README.md

docker-compose up --build

version: '3.8'

services:
  auth-service:
    build: ./auth-service
    ports:
      - "8080:8080"

  restaurant-service:
    build: ./restaurant-service
    ports:
      - "8081:80"

  order-service:
    build: ./order-service
    ports:
      - "8082:80"

  payment-service:
    build: ./payment-service
    ports:
      - "8083:80"

  delivery-service:
    build: ./delivery-service
    ports:
      - "8084:80"

  email-service:
    build: ./email-service
    ports:
      - "8085:80"

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    stdin_open: true
    tty: true
