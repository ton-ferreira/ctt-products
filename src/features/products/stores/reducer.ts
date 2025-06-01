import {
  ProductsState,
  ProductsAction,
  SET_PRODUCTS,
  SET_LOADING,
  SET_ERROR,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../types";

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: "",
};

export function productsReducer(
  state = initialState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_PRODUCTS:
      return { ...state, items: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case ADD_PRODUCT:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_PRODUCT:
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
}
