using Microsoft.Data.SqlClient;
using Northwind.API.Models;
using System.Data;

namespace Northwind.API.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderSummary>> GetTopCustomersByOrderCountAsync();
}

public class OrderService : IOrderService
{
    private readonly string _connectionString;

    public OrderService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<IEnumerable<OrderSummary>> GetTopCustomersByOrderCountAsync()
    {
        var summaries = new List<OrderSummary>();
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetTopCustomersByOrderCount", connection);
        command.CommandType = CommandType.StoredProcedure;
        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            summaries.Add(new OrderSummary
            {
                CustomerName = reader.GetString(0),
                OrderCount = reader.GetInt32(1)
            });
        }
        return summaries;
    }
} 