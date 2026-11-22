# SolarFlow 

**A solar installation business management system.**

SolarFlow is a web-based business management application designed to help a solar installation business manage its daily operations in one place.

The system aims to streamline inventory management, customer records, quotations, installation tracking, invoicing, and payment monitoring.

## Overview

Managing a solar installation business involves tracking products, preparing quotations, coordinating installations, and monitoring customer payments.

SolarFlow aims to simplify these processes through a centralized system with a responsive, installable interface.

## Planned Features

- **Inventory Management** — Manage solar panels, inverters, batteries, and other supplies while tracking stock movements.
- **Customer Management** — Store customer information and installation addresses.
- **Quotation Management** — Create quotations, calculate costs, and generate PDF documents.
- **Installation Tracking** — Schedule installations and monitor project progress.
- **Invoice Management** — Generate invoices and track outstanding balances.
- **Payment Tracking** — Record partial and full payments.
- **Business Automation** — Receive reminders for low stock, upcoming installations, and overdue payments.
- **Dashboard and Reports** — View important business information and operational summaries.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development and build tool |
| Node.js | JavaScript runtime |
| Express.js | Backend REST API |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and schema management |
| Tailwind CSS | UI styling |

Additional tools and libraries will be introduced as development progresses.

## Architecture

SolarFlow follows a **modular monolith architecture** with separate frontend and backend applications.

```text
solarflow/
├── client/          # React frontend
│   └── src/
│
├── server/          # Express backend
│   ├── src/
│   └── prisma/
│
├── docs/            # Project documentation
│
├── .gitignore
└── README.md
```

### Application Flow

```text
React Frontend
      |
      | HTTP Requests
      v
Express REST API
      |
      v
Backend Modules
      |
      v
Prisma ORM
      |
      v
PostgreSQL Database
```

The frontend handles user interaction and presentation, while the backend handles business logic, validation, authentication, and database operations.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL
- Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd solarflow
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### Environment Variables

Create the necessary `.env` files based on your environment configuration.

Example backend environment variables:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/solarflow"
```

Never commit environment files containing credentials or secrets.

### Running the Application

Start the frontend and backend using the development scripts configured in their respective `package.json` files.

## Project Status

**Currently in development.**

The initial project structure is established. Development will proceed incrementally, starting with the application foundation, authentication, and inventory management.

## Development Approach

SolarFlow is being developed with an emphasis on:

- Maintainable and modular code
- Clear separation of frontend and backend responsibilities
- Proper database relationships
- Reliable business logic
- Input validation and security
- Testing and documentation

## License

This project is currently under development. License details will be added later.