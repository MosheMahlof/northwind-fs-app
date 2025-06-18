import type { Product } from "../types";
import type { CreateOrUpdateProduct } from "../types/CreateOrUpdateProduct";

export const transformToProduct = (
  obj: CreateOrUpdateProduct,
  sourceProduct?: Product
) => {
  const { delimiter } = parseUnitDescription(sourceProduct?.unitDescription);
  const updatedProd: Omit<Product, "productId"> = {
    productName: obj.productName,
    categoryId: obj.categoryId,
    supplierId: obj.supplierId,
    unitPrice: obj.unitPrice,
    unitDescription: `${obj.quantityPerUnit} ${delimiter} ${obj.units}`.trim(),
  };

  return updatedProd;
};

export function parseUnitDescription(unitDescription: string | undefined): {
  quantityPerUnit: string;
  units: string;
  delimiter: string;
} {
  if (!unitDescription)
    return { quantityPerUnit: "", units: "", delimiter: "" };

  // Rule 1: "N - ..." pattern
  const dashMatch = unitDescription.match(/^(\d+)\s*-\s*(.+)$/);
  if (dashMatch) {
    return {
      quantityPerUnit: dashMatch[1],
      units: dashMatch[2].trim(),
      delimiter: "-",
    };
  }

  // Rule 2: " x " or " X " pattern (with spaces)
  const xMatch = unitDescription.match(/^(.+?)\s[xX]\s(.+)$/);
  if (xMatch) {
    return {
      quantityPerUnit: xMatch[1].trim(),
      units: xMatch[2].trim(),
      delimiter: "x",
    };
  }

  // Rule 3: Single value (e.g., "500 g")
  const singleValueMatch = unitDescription.match(/^(\d+.*)$/);
  if (singleValueMatch) {
    return {
      quantityPerUnit: singleValueMatch[1].trim(),
      units: "",
      delimiter: "",
    };
  }

  // Rule 4: Fallback
  return {
    quantityPerUnit: unitDescription.trim(),
    units: "",
    delimiter: "",
  };
}
