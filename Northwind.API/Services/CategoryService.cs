using Microsoft.Data.SqlClient;
using Northwind.API.Models;
using System.Data;

namespace Northwind.API.Services;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
}

public class CategoryService : ICategoryService
{
    private readonly string _connectionString;

    public CategoryService(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new ArgumentNullException(nameof(configuration));
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        var categories = new List<Category>();
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetAllCategories", connection);
        command.CommandType = CommandType.StoredProcedure;
        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            categories.Add(new Category
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1)
            });
        }
        return categories;
    }
} 