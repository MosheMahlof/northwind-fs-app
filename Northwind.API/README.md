# Northwind API

A fullstack CRUD application for managing products in the Northwind database.

## Prerequisites

- Docker desktop and Docker Compose
- .NET 6 SDK
- Git

## Setup Instructions

2. Start the SQL Server container:

```bash
run docker desktop
docker-compose up -d
```

3. Run the database initialization script (this will also create the stored procedures):

```bash
docker exec -it northwind-sqlserver bash
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -C -i /init/01-init-northwind.sql 
```

4. Run the .NET application:

```bash
cd Northwind.API
dotnet run
```

The API will be available at `http://localhost:5234`

## API Documentation

**Swagger UI is available at:** `http://localhost:5234/swagger`

You can use Swagger to explore and test all available endpoints interactively.

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update an existing product
- `DELETE /api/products/{id}` - Delete a product

### Categories

- `GET /api/category` - Get all categories

### Suppliers

- `GET /api/supplier` - Get all suppliers

### Orders

- `GET /api/order/top-customers` - Get top customers by order count

## Database Configuration

The application uses Microsoft SQL Server 2022 running in a Docker container.

Connection string:

```
Server=localhost,1433;Database=Northwind;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True
```
