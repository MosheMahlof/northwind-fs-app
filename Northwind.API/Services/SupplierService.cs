using Microsoft.Data.SqlClient;
using Northwind.API.Models;
using System.Data;

namespace Northwind.API.Services;

public interface ISupplierService
{
    Task<IEnumerable<Supplier>> GetAllSuppliersAsync();
}

public class SupplierService : ISupplierService
{
    private readonly string _connectionString;

    public SupplierService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
    {
        var suppliers = new List<Supplier>();
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetAllSuppliers", connection);
        command.CommandType = CommandType.StoredProcedure;
        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            suppliers.Add(new Supplier
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1)
            });
        }
        return suppliers;
    }
} 