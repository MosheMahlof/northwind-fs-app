import React, { useContext, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Grid } from "@mui/material";
import type { Product } from "../types";
import type { CreateOrUpdateProduct } from "../types/CreateOrUpdateProduct";
import { parseUnitDescription } from "../services/utilities";
import { useDataContext } from "../context/DataContext";
import { UIContext } from "../context/UIContext";
import { ConfirmDialog } from "./ConfirmDialog";

const LOCAL_STORAGE_KEY = import.meta.env.VITE_API_PRODUCT_LOCAL_STORAGE_KEY;

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: CreateOrUpdateProduct) => void;
}

export const ProductForm = ({ product, onSubmit }: ProductFormProps) => {
  const parsed = parseUnitDescription(product?.unitDescription || "");
  const { categories, suppliers } = useDataContext();
  const { showToast } = useContext(UIContext);

  const [formData, setFormData] = React.useState<CreateOrUpdateProduct>(() => {
    // Try to load form data from localStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        showToast("Error loading previous form data", "error");
      }
    }
    // Fallback to default form data
    return {
      productName: product?.productName || "",
      supplierId: product?.supplierId,
      categoryId: product?.categoryId,
      quantityPerUnit: parsed.quantityPerUnit,
      unitPrice: product?.unitPrice,
      units: parsed.units,
    };
  });

  // Save to cuurent form data on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Clear form data from localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    };
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Compare function for edit mode
  const isUnchanged =
    !!product &&
    formData.productName === (product.productName || "") &&
    formData.supplierId === product.supplierId &&
    formData.categoryId === product.categoryId &&
    formData.quantityPerUnit === parsed.quantityPerUnit &&
    formData.unitPrice === product.unitPrice &&
    formData.units === parsed.units;

  const [formErrors, setFormErrors] = React.useState({
    productName: "",
    supplierId: "",
    categoryId: "",
    quantityPerUnit: "",
    unitPrice: "",
    units: "",
  });

  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

  const validate = () => {
    const errors: typeof formErrors = {
      productName: !formData.productName
        ? "Product name is required."
        : formData.productName.length > 50
        ? "Product name cannot exceed 50 characters."
        : "",
      categoryId: "",
      supplierId: "",
      quantityPerUnit:
        formData.quantityPerUnit && formData.quantityPerUnit.length > 25
          ? "Quantity per unit cannot exceed 25 characters."
          : "",
      unitPrice: "",
      units: "",
    };
    setFormErrors(errors);
    return Object.values(errors).every((e) => !e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (product) {
      setShowConfirmDialog(true);
    } else {
      submitProduct();
    }
  };

  const submitProduct = () => {
    try {
      onSubmit({
        productName: formData.productName,
        categoryId: formData.categoryId,
        supplierId: formData.supplierId,
        quantityPerUnit: formData.quantityPerUnit,
        unitPrice: formData.unitPrice,
        units: formData.units,
      });
      showToast(
        product
          ? "Product updated successfully!"
          : "Product created successfully!",
        "success"
      );
      if (!product) {
        // reset form if product was created
        setFormData({
          productName: "",
          categoryId: 0,
          supplierId: 0,
          quantityPerUnit: "",
          units: "",
          unitPrice: 0,
        });
      }
      clearLocalStorage();
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  const handleConfirmEdit = () => {
    setShowConfirmDialog(false);
    submitProduct();
  };

  const handleCancelEdit = () => {
    setShowConfirmDialog(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container direction={"column"} spacing={2}>
        <Grid>
          <TextField
            label="Product Name"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            required
            fullWidth
            error={!!formErrors.productName}
            helperText={formErrors.productName || " "}
          />
        </Grid>
        <Grid>
          <TextField
            select
            label="Category"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: Number(e.target.value) })
            }
            fullWidth
            error={!!formErrors.categoryId}
            helperText={formErrors.categoryId || " "}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid>
          <TextField
            select
            label="Supplier"
            value={formData.supplierId}
            onChange={(e) =>
              setFormData({ ...formData, supplierId: Number(e.target.value) })
            }
            fullWidth
            error={!!formErrors.supplierId}
            helperText={formErrors.supplierId || " "}
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid>
          <TextField
            label="Quantity Per Unit"
            value={formData.quantityPerUnit}
            onChange={(e) =>
              setFormData({ ...formData, quantityPerUnit: e.target.value })
            }
            fullWidth
            error={!!formErrors.quantityPerUnit}
            helperText={formErrors.quantityPerUnit || " "}
          />
        </Grid>
        <Grid>
          <TextField
            label="Unit Price"
            type="number"
            value={formData.unitPrice}
            onChange={(e) =>
              setFormData({ ...formData, unitPrice: Number(e.target.value) })
            }
            fullWidth
            slotProps={{
              input: {
                inputProps: {
                  min: 0,
                  step: 0.1,
                },
              },
            }}
            error={!!formErrors.unitPrice}
            helperText={formErrors.unitPrice || " "}
          />
        </Grid>
        <Grid>
          <TextField
            label="Units"
            value={formData.units}
            onChange={(e) =>
              setFormData({ ...formData, units: e.target.value })
            }
            fullWidth
            error={!!formErrors.units}
            helperText={formErrors.units || " "}
          />
        </Grid>

        <Grid>
          <Box display="flex" gap={2} width="100%" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!!product && isUnchanged}
            >
              {product ? "Update" : "Create"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={showConfirmDialog}
        title="Update Product"
        description={`Are you sure you want to update "${formData.productName}"?`}
        onClose={handleCancelEdit}
        onConfirm={handleConfirmEdit}
        confirmText="Update"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default ProductForm;
