import { useDataContext } from "../context/DataContext";
import React, { useMemo, useState } from "react";
import { Box, Typography, Paper, Button, List, ListItem } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ProductSearchAutocomplete from "../components/ProductSearchAutocomplete";
import { ProductTable } from "../components/ProductTable";
import type { CustomerOrderCount } from "../types";
import { ProductList } from "../components/ProductList ";
import { useUIContext } from "../context/UIContext";

export const HomePage = () => {
  const { products, deleteProduct, getTopCustomers } = useDataContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [topCustomers, setTopCustomers] = useState<CustomerOrderCount[]>([]);
  const { isMobile } = useUIContext();
  React.useEffect(() => {
    getTopCustomers().then((data) => {
      setTopCustomers(data.slice(0, 3));
    });
  }, [getTopCustomers]);

  // Filter products by name or category
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.productName.toLowerCase().includes(lower) ||
        p.categoryName?.toLowerCase().includes(lower)
    );
  }, [products, searchTerm]);

  return (
    <Box width="100%">
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Top Customers
        </Typography>
        <List dense>
          {topCustomers.map((c, i) => (
            <ListItem key={i}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {c.customerName} :
              </Typography>
              <Typography variant="body1">{c.orderCount} orders</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box
        display="flex"
        flexDirection={isMobile ? "column-reverse" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        justifyContent="space-between"
        gap={2}
        mb={2}
      >
        <ProductSearchAutocomplete
          products={products}
          onSearch={setSearchTerm}
        />
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/products/new"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "none",
          }}
        >
          <Typography variant="body1">+ New Product</Typography>
        </Button>
      </Box>

      {isMobile ? (
        <ProductList
          products={filteredProducts}
          onEdit={(product) => navigate(`/products/${product.productId}/edit`)}
          onDelete={deleteProduct}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => navigate(`/products/${product.productId}/edit`)}
          onDelete={deleteProduct}
        />
      )}
    </Box>
  );
};
