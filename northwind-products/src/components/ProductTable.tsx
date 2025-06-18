import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDialog } from "./ConfirmDialog";
import type { Product } from "../types";
import { UIContext } from "../context/UIContext";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showToast } = useContext(UIContext);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await onDelete(deleteId);
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
      setDialogOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <Box>
      <Box sx={{ maxHeight: 385, overflowY: "auto", width: "100%" }}>
        <Table stickyHeader sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>{product.supplierName}</TableCell>
                <TableCell>${product.unitPrice?.toFixed(2) || 0}</TableCell>
                <TableCell>{product.unitDescription}</TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => onEdit(product)} size="small">
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(product.productId)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
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
