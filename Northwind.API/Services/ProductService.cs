using Microsoft.Data.SqlClient;
using Northwind.API.Models;
using System.Data;

namespace Northwind.API.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
    Task<int> CreateProductAsync(Product product);
    Task<bool> UpdateProductAsync(Product product);
    Task<bool> DeleteProductAsync(int id);
}

public class ProductService : IProductService
{
    private readonly string _connectionString;

    public ProductService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        var products = new List<Product>();

        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetProducts", connection);
        command.CommandType = CommandType.StoredProcedure;

        await connection.OpenAsync();

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            products.Add(new Product
            {
                ProductId = reader.GetInt32(0),
                ProductName = reader.GetString(1),
                CategoryId = reader.IsDBNull(2) ? null : reader.GetInt32(2),
                CategoryName = reader.IsDBNull(3) ? null : reader.GetString(3),
                SupplierId = reader.IsDBNull(4) ? null : reader.GetInt32(4),
                SupplierName = reader.IsDBNull(5) ? null : reader.GetString(5),
                UnitDescription = reader.IsDBNull(6) ? null : reader.GetString(6),
                UnitPrice = reader.IsDBNull(7) ? null : reader.GetDecimal(7)
            });
        }

        return products;
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetProductById", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.AddWithValue("@ProductId", id);

        await connection.OpenAsync();

        using var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new Product
            {
                ProductId = reader.GetInt32(0),
                ProductName = reader.GetString(1),
                CategoryId = reader.IsDBNull(2) ? null : reader.GetInt32(2),
                CategoryName = reader.IsDBNull(3) ? null : reader.GetString(3),
                SupplierId = reader.IsDBNull(4) ? null : reader.GetInt32(4),
                SupplierName = reader.IsDBNull(5) ? null : reader.GetString(5),
                UnitDescription = reader.IsDBNull(6) ? null : reader.GetString(6),
                UnitPrice = reader.IsDBNull(7) ? null : reader.GetDecimal(7)
            };
        }

        return null;
    }

    public async Task<int> CreateProductAsync(Product product)
    {
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_CreateProduct", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@ProductName", product.ProductName);
        command.Parameters.AddWithValue("@SupplierId", (object?)product.SupplierId ?? DBNull.Value);
        command.Parameters.AddWithValue("@CategoryId", (object?)product.CategoryId ?? DBNull.Value);
        command.Parameters.AddWithValue("@Unit", (object?)product.UnitDescription ?? DBNull.Value);
        command.Parameters.AddWithValue("@Price", (object?)product.UnitPrice ?? DBNull.Value);

        await connection.OpenAsync();
        return Convert.ToInt32(await command.ExecuteScalarAsync());
    }

    public async Task<bool> UpdateProductAsync(Product product)
    {
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_UpdateProduct", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@ProductId", product.ProductId);
        command.Parameters.AddWithValue("@ProductName", product.ProductName);
        command.Parameters.AddWithValue("@SupplierId", (object?)product.SupplierId ?? DBNull.Value);
        command.Parameters.AddWithValue("@CategoryId", (object?)product.CategoryId ?? DBNull.Value);
        command.Parameters.AddWithValue("@Price", (object?)product.UnitPrice ?? DBNull.Value);
        command.Parameters.AddWithValue("@Unit", (object?)product.UnitDescription ?? DBNull.Value);

        await connection.OpenAsync();
        return await command.ExecuteNonQueryAsync() > 0;
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_DeleteProduct", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.AddWithValue("@ProductId", id);

        await connection.OpenAsync();
        return await command.ExecuteNonQueryAsync() > 0;
    }
}