
# Restaurent_MonoRepo_MicroService
## 🍽️ Foody – Food Delivery Microservices App

A full-stack food delivery application built with a modern microservices architecture using Node.js, .NET, React (Vite), Docker, and Kafka. Each service runs independently and communicates through Kafka or HTTP APIs. The entire system is containerized and orchestrated with Docker Compose (Kubernetes support coming soon).

---

## 🧩 Microservices Overview

| Port  | Service           | Technology   | Description                                   |
|-------|-------------------|--------------|-----------------------------------------------|
| 8080  | Auth Service       | Node.js      | Manages user login, registration, and tokens  |
| 8081  | Restaurant Service | .NET         | Manages restaurant profiles and menus         |
| 8082  | Order Service      | .NET         | Handles order creation, history, and updates  |
| 8083  | Payment Service    | .NET         | Handles payment logic and billing             |
| 8084  | Delivery Service   | .NET         | Coordinates delivery status and agents        |
| 8085  | Email Service      | .NET         | Sends transactional emails (orders, alerts)   |
| 5173  | Frontend           | React (Vite) | User-facing UI for customers and restaurants  |

---

## 📦 Monorepo Structure

\`\`\`
Restaurent_MonoRepo_MicroService/
│
├── Auth Service/             # Node.js Auth Service
├── RestaurantService/        # .NET Restaurant Service
├── OrderService/             # .NET Order Service
├── PaymentService/           # .NET Payment Service
├── DeliveryService/          # .NET Delivery Service
├── EmailService/             # .NET Email Notifications
├── Frontend/                 # React Vite UI (customer and admin portals)
├── docker-compose.yml        # Compose file for dev environment
└── README.md
\`\`\`

---

## 🚀 Getting Started with Docker

Make sure you have Docker and Docker Compose installed.

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/manujayak-hub/Restaurent_MonoRepo_MicroService.git
cd Restaurent_MonoRepo_MicroService
\`\`\`

### 2. Build and Run with Docker Compose

\`\`\`bash
docker-compose up --build
\`\`\`

### 3. Access the Application

- Frontend: http://localhost:5173
- Auth API: http://localhost:8080
- Restaurant API: http://localhost:8081
- Orders, Payment, Delivery, Email — via respective ports listed above

---

## 🛠️ Technologies

- Node.js / Express (Auth Service)
- .NET 8 Web API (Other backend services)
- React + Vite (Frontend UI)
- Docker (Containerization)
- MongoDB / MS SQL Server (Storage)
- JWT Authentication

---

## 📬 Inter-Service Communication

- Kafka is used for async communication (e.g., sending tokens from Auth to .NET services).
- REST APIs are used for direct CRUD operations between Frontend and backend services.

---

## 📌 Notes

- Each service has its own Dockerfile and can be deployed independently.
- Environment variables and secrets should be configured via .env files.
- All services are written in a way to support future deployment to Kubernetes.
"""

# Save to a markdown file
readme_path = Path("/mnt/data/README.md")
readme_path.write_text(readme_md_content.strip())

# Return the file path
readme_path.name
