import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { useDataContext } from "../context/DataContext";
import type { CreateOrUpdateProduct } from "../types/CreateOrUpdateProduct";
import { transformToProduct } from "../services/utilities";

export const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useDataContext();

  const product = products.find((p) => p.productId === Number(id));

  if (!product) {
    return (
      <Box p={3}>
        <Typography variant="h4" color="error">
          Product not found
        </Typography>
      </Box>
    );
  }

  const handleSubmit = (updatedProduct: CreateOrUpdateProduct) => {
    const updatedProd = transformToProduct(updatedProduct, product);
    updateProduct({
      ...updatedProd,
      productId: product.productId,
    });
  };

  return (
    <Box
      p={3}
      width={"100%"}
      maxWidth={"600px"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Edit Product
      </Typography>
      <ProductForm product={product} onSubmit={handleSubmit} />
    </Box>
  );
};
