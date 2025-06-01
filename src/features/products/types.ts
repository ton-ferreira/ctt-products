export type Product = {
  id: string;
  stock: number;
  description: string;
  categories: string[];
  price: number;
};

export type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

type Action<T extends string, P> = {
  type: T;
  payload: P;
};

export type SetProductsAction = Action<typeof SET_PRODUCTS, Product[]>;
export type SetLoadingAction = Action<typeof SET_LOADING, boolean>;
export type SetErrorAction = Action<typeof SET_ERROR, string>;
export type AddProductAction = Action<typeof ADD_PRODUCT, Product>;
export type UpdateProductAction = Action<typeof UPDATE_PRODUCT, Product>;
export type DeleteProductAction = Action<typeof DELETE_PRODUCT, string>;

export type ProductsAction =
  | SetProductsAction
  | SetLoadingAction
  | SetErrorAction
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction;
