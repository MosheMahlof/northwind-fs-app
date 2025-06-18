import React, { useState } from "react";
import { Paper, Typography, Box, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box>
      {products.map((product) => (
        <Paper
          key={product.productId}
          sx={{
            mb: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => handleExpand(product.productId)}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.categoryName}
              </Typography>
            </Box>
            <IconButton>
              {expandedId === product.productId ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse
            in={expandedId === product.productId}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography variant="body2">
                <b>Supplier:</b> {product.supplierName}
              </Typography>
              <Typography variant="body2">
                <b>Unit Price:</b> ${product.unitPrice?.toFixed(2) || 0}
              </Typography>
              <Typography variant="body2">
                <b>Units:</b> {product.unitDescription}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 1,
                }}
              >
                <IconButton onClick={() => onEdit(product)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product.productId);
                  }}
                  color="error"
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};
