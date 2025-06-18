export type Product = {
  productId: number;
  productName: string;
  categoryId?: number;
  supplierId?: number;
  categoryName?: string;
  supplierName?: string;
  unitDescription?: string;
  unitPrice?: number;
};
