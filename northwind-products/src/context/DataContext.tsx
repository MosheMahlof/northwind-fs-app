import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, Category, Supplier, CustomerOrderCount } from "../types";
import {
  categoryService,
  orderService,
  productService,
  supplierService,
} from "../services/httpService";

type DataContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, "productId">) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  categories: Category[];
  suppliers: Supplier[];
  getTopCustomers: () => Promise<CustomerOrderCount[]>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx)
    throw new Error("useDataContext must be used inside a DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supplierService.getAll();
      setSuppliers(response.data);
    } catch (err) {
      setError("Failed to fetch suppliers");
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "productId">) => {
    try {
      setError(null);
      const response = await productService.create(product);
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError("Failed to add product");
      throw err;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      setError(null);
      const response = await productService.update(product.productId, product);
      setProducts((prev) =>
        prev.map((p) => (p.productId === product.productId ? response.data : p))
      );
    } catch (err) {
      setError("Failed to update product");
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setError(null);
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    } catch (err) {
      setError("Failed to delete product");
      throw err;
    }
  };

  const getTopCustomers = async () => {
    try {
      const response = await orderService.getTopCustomers();
      return response.data;
    } catch (err) {
      setError("Failed to fetch top customers");
      throw err;
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        suppliers,
        getTopCustomers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
