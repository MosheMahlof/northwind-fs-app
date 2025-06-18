namespace Northwind.API.Models;

public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int? SupplierId { get; set; }
    public int? CategoryId { get; set; }
    public string? UnitDescription { get; set; }
    public decimal? UnitPrice { get; set; }

    // Navigation properties
    public string? CategoryName { get; set; }
    public string? SupplierName { get; set; }
}