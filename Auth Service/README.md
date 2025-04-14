[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/xIbq4TFL)
# Personal Finance Tracker API

This project is a secure RESTful API for managing personal finances, built with **Node.js (Express.js)** and **MongoDB**. It allows users to track income and expenses, set budgets, generate reports, and analyze spending trends while ensuring secure authentication and data integrity.

## Features

### 1. User Roles and Authentication
- JWT-based authentication for secure access.
- Admin role:
  - Manage user accounts.
  - Oversee all transactions and reports.
  - Configure system settings.
- Regular User:
  - Add, edit, and delete personal transactions.
  - Set and manage budgets.
  - View and generate financial reports.

### 2. Expense and Income Tracking
- CRUD operations for income and expense entries.
- Categorize expenses (Food, Transport, etc.).
- Tag transactions for better filtering.
- Recurring transactions with custom recurrence patterns.

### 3. Budget Management
- Set monthly or category-based budgets.
- Alerts when nearing or exceeding budgets.
- AI-based budget adjustment recommendations.

### 4. Financial Reports
- Visualize income vs. expenses via charts.
- Filter reports by time periods, categories, or tags.

### 5. Notifications & Alerts
- Notify users of unusual spending patterns.
- Reminders for bill payments & financial goals.

### 6. Goals & Savings Tracking
- Set and track financial savings goals.
- Automatic allocation of savings.

### 7. Multi-Currency Support
- Manage finances in multiple currencies.
- Real-time exchange rate updates.

### 8. Role-Based Dashboard
- **Admin Dashboard:** Overview of users, transactions, and reports.
- **User Dashboard:** Personalized summary of transactions, budgets, and goals.

## Installation & Setup

### Prerequisites
- Node.js & npm installed
- MongoDB running locally or on a cloud service

### Security Test
![API Endpoints](<Screenshot (22).png>)
![Attack Output](<Screenshot (23).png>)