import { RootState } from "../../../../store";
import { Product } from "../types/products";
import { getProductById } from "../selectors";

const mockProducts: Product[] = [
  {
    id: "c112bd93-7792-4afa-8bea-aa1b6ccdfb75",
    stock: 10,
    description: "A nice product",
    categories: [],
    price: 10.0,
  },
  {
    id: "4e191645-4a1c-4d3c-bb7e-c43f420ffaa9",
    stock: 5,
    description: "Another nice product",
    categories: [],
    price: 20.0,
  },
];

const mockState = {
  products: {
    items: mockProducts,
    loading: false,
    error: null,
  },
} as RootState;

describe("products selectors", () => {
  it("should return the correct product when given a valid ID", () => {
    const result = getProductById(mockState, mockProducts[0].id);
    expect(result).toEqual(mockProducts[0]);
  });

  it("should return undefined when given a non-existing ID", () => {
    const result = getProductById(mockState, "wrong-id");
    expect(result).toBeUndefined();
  });
});
