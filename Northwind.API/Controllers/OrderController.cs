using Microsoft.AspNetCore.Mvc;
using Northwind.API.Services;
using Northwind.API.Models;

namespace Northwind.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrderController> _logger;

    public OrderController(IOrderService orderService, ILogger<OrderController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    [HttpGet("top-customers")]
    public async Task<ActionResult<IEnumerable<OrderSummary>>> GetTopCustomersByOrderCount()
    {
        try
        {
            var summaries = await _orderService.GetTopCustomersByOrderCountAsync();
            return Ok(summaries);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting top customers by order count");
            return StatusCode(500, "An error occurred while retrieving top customers");
        }
    }
} 