export type CreateOrUpdateProduct = {
  productName: string;
  categoryId?: number;
  supplierId?: number;
  quantityPerUnit?: string;
  unitPrice?: number;
  units?: string;
};
