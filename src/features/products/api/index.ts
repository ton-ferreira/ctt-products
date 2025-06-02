import { CategoryId } from "../stores/types/categories";
import { Product } from "../stores/types/products";

let mockProducts: Product[] = [
  {
    id: "c112bd93-7792-4afa-8bea-aa1b6ccdfb75",
    stock: 1,
    description: "Some nice product",
    categories: [CategoryId.Food],
    price: 10.0,
  },
];

const fakeLoadingDelay = () => new Promise((res) => setTimeout(res, 350));

export const fetchProducts = async (): Promise<Product[]> => {
  await fakeLoadingDelay();
  return [...mockProducts];
};

export const createProduct = async (product: Product): Promise<Product> => {
  await fakeLoadingDelay();
  mockProducts.push(product);
  return product;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  await fakeLoadingDelay();
  mockProducts = mockProducts.map((p) => (p.id === product.id ? product : p));
  return product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await fakeLoadingDelay();
  mockProducts = mockProducts.filter((p) => p.id !== id);
};
