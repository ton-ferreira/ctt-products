import { RootState } from "../../../store";
import { Product } from "../types";

export const getProductById = (
  state: RootState,
  id: string
): Product | undefined => {
  return state.products.items.find((product) => product.id === id);
};
