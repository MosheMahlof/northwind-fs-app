import { Box, Typography } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { useDataContext } from "../context/DataContext";
import type { CreateOrUpdateProduct } from "../types/CreateOrUpdateProduct";
import { transformToProduct } from "../services/utilities";

export const CreateProductPage = () => {
  const { addProduct } = useDataContext();
  const handleSubmit = (product: CreateOrUpdateProduct) => {
    const newProduct = transformToProduct(product, undefined);
    addProduct(newProduct);
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
        Create Product
      </Typography>
      <ProductForm onSubmit={handleSubmit} />
    </Box>
  );
};
