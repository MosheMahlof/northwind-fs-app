import React from "react";
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
import type { Product } from "../types";

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
                    onClick={() => onDelete(product.productId)}
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
    </Box>
  );
};
