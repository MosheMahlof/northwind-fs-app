import { useDataContext } from "../context/DataContext";
import React, { useMemo, useState } from "react";
import { Box, Typography, Paper, Button, List, ListItem } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ProductSearchAutocomplete from "../components/ProductSearchAutocomplete";
import { ProductTable } from "../components/ProductTable";
import type { CustomerOrderCount } from "../types";
import { ProductList } from "../components/ProductList ";
import { useUIContext } from "../context/UIContext";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isMobile, showToast } = useUIContext();
  const { products, deleteProduct, getTopCustomers } = useDataContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [topCustomers, setTopCustomers] = useState<CustomerOrderCount[]>([]);
  React.useEffect(() => {
    getTopCustomers().then((data) => {
      setTopCustomers(data.slice(0, 3));
    });
  }, [getTopCustomers]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleCancelDeleteClick = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteProduct(deleteId);
      showToast("Product deleted successfully.", "success");
    } catch (error: unknown) {
      let message = "Delete failed.";
      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: unknown };
          message?: string;
        };
        if (err.response?.data) {
          message =
            typeof err.response.data === "string"
              ? err.response.data
              : typeof err.response.data === "object" &&
                err.response.data !== null &&
                "message" in err.response.data
              ? (err.response.data as { message?: string }).message || message
              : message;
        } else if (err.message) {
          message = err.message;
        }
      }
      showToast(message, "error");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

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
          onDelete={handleDeleteClick}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => navigate(`/products/${product.productId}/edit`)}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleCancelDeleteClick}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        color="error"
      />
    </Box>
  );
};
