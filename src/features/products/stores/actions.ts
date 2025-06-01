import {
  SET_PRODUCTS,
  SET_LOADING,
  SET_ERROR,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  Product,
  SetProductsAction,
  SetLoadingAction,
  SetErrorAction,
  AddProductAction,
  UpdateProductAction,
  DeleteProductAction,
} from "./types/products";

export const setProducts = (products: Product[]): SetProductsAction => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setLoading = (value: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: value,
});

export const setError = (msg: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: msg,
});

export const addProduct = (product: Product): AddProductAction => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (product: Product): UpdateProductAction => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id: string): DeleteProductAction => ({
  type: DELETE_PRODUCT,
  payload: id,
});
