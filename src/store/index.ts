import { createStore, combineReducers } from "redux";
import { productsReducer } from "../features/products/stores/reducer";

const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
