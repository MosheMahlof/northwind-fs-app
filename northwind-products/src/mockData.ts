import type { Product, Supplier, Category, Customer, Order } from "./types";

export const categories: Category[] = [
  { id: 1, name: "Beverages" },
  { id: 2, name: "Condiments" },
];

export const suppliers: Supplier[] = [
  { id: 1, name: "Exotic Liquids" },
  { id: 2, name: "New Orleans Cajun Delights" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Chai",
    category: categories[0],
    supplier: suppliers[0],
    quantityPerUnit: "10 boxes x 20 bags",
    unitPrice: 18.0,
    unitsInStock: 39,
  },
  {
    id: 2,
    name: "Chef Anton's Cajun Seasoning",
    category: categories[1],
    supplier: suppliers[1],
    quantityPerUnit: "48 - 6 oz jars",
    unitPrice: 22.0,
    unitsInStock: 53,
  },
  {
    id: 3,
    name: "Chang",
    category: categories[0],
    supplier: suppliers[0],
    quantityPerUnit: "24 - 12 oz bottles",
    unitPrice: 19.0,
    unitsInStock: 17,
  },
  {
    id: 4,
    name: "Aniseed Syrup",
    category: categories[1],
    supplier: suppliers[1],
    quantityPerUnit: "12 - 550 ml bottles",
    unitPrice: 10.0,
    unitsInStock: 13,
  },
  {
    id: 5,
    name: "Grandma's Boysenberry Spread",
    category: categories[1],
    supplier: suppliers[1],
    quantityPerUnit: "12 - 8 oz jars",
    unitPrice: 25.0,
    unitsInStock: 120,
  },
  {
    id: 6,
    name: "Uncle Bob's Organic Dried Pears",
    category: categories[0],
    supplier: suppliers[0],
    quantityPerUnit: "12 - 1 lb pkgs.",
    unitPrice: 30.0,
    unitsInStock: 15,
  },
  {
    id: 7,
    name: "Northwoods Cranberry Sauce",
    category: categories[1],
    supplier: suppliers[1],
    quantityPerUnit: "12 - 12 oz jars",
    unitPrice: 40.0,
    unitsInStock: 6,
  },
  {
    id: 8,
    name: "Mishi Kobe Niku",
    category: categories[0],
    supplier: suppliers[0],
    quantityPerUnit: "18 - 500 g pkgs.",
    unitPrice: 97.0,
    unitsInStock: 29,
  },
  {
    id: 9,
    name: "Ikura",
    category: categories[1],
    supplier: suppliers[1],
    quantityPerUnit: "12 - 200 ml jars",
    unitPrice: 31.0,
    unitsInStock: 31,
  },
  {
    id: 10,
    name: "Queso Cabrales",
    category: categories[0],
    supplier: suppliers[0],
    quantityPerUnit: "1 kg pkg.",
    unitPrice: 21.0,
    unitsInStock: 22,
  },
];

export const customers: Customer[] = [
  { id: "ALFKI", name: "Alfreds Futterkiste" },
  { id: "ANATR", name: "Ana Trujillo Emparedados y helados" },
  { id: "ANTON", name: "Antonio Moreno Taquería" },
];

export const orders: Order[] = [
  { id: 1, customerId: "ALFKI", orderDate: "2023-01-10" },
  { id: 2, customerId: "ALFKI", orderDate: "2023-02-15" },
  { id: 3, customerId: "ANATR", orderDate: "2023-01-22" },
];
