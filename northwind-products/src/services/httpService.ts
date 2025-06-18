import api from "./api";
import type { Product, Category, Supplier, CustomerOrderCount } from "../types";

export const productService = {
  getAll: () => api.get<Product[]>("/Products"),
  getById: (id: number) => api.get<Product>(`/Products/${id}`),
  create: (product: Omit<Product, "productId">) =>
    api.post<Product>("/Products", product),
  update: (id: number, product: Omit<Product, "productId">) =>
    api.put<Product>(`/Products/${id}`, product),
  delete: (id: number) => api.delete(`/Products/${id}`),
};

export const categoryService = {
  getAll: () => api.get<Category[]>("/Category"),
};

export const supplierService = {
  getAll: () => api.get<Supplier[]>("/Supplier"),
};

export const orderService = {
  getTopCustomers: () => api.get<CustomerOrderCount[]>("/Order/top-customers"),
};
