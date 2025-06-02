import { useDispatch } from "react-redux";
import {
  createProduct,
  deleteProduct as apiDeleteProduct,
  updateProduct as apiUpdateProduct,
  fetchProducts,
} from "../api";
import { Product } from "../stores/types/products";
import {
  addProduct,
  deleteProduct,
  setError,
  setLoading,
  setProducts,
  updateProduct,
} from "../stores/actions";

const useProductActions = () => {
  const dispatch = useDispatch();

  const addNewProduct = async (product: Product) => {
    try {
      dispatch(setLoading(true));
      await createProduct(product);
      dispatch(addProduct(product));
    } catch {
      dispatch(
        setError("Could not save your product. Please, try again later.")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      dispatch(setLoading(true));
      await apiDeleteProduct(productId);
      dispatch(deleteProduct(productId));
    } catch {
      dispatch(
        setError("Could not remove this product. Please, try again later.")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editProduct = async (product: Product) => {
    try {
      dispatch(setLoading(true));
      await apiUpdateProduct(product);
      dispatch(updateProduct(product));
    } catch {
      dispatch(
        setError("Changes could not be saved. Please, try again later.")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const products = await fetchProducts();
      dispatch(setProducts(products));
    } catch {
      dispatch(
        setError("Unable to get product list. Please, refresh the page.")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    addNewProduct,
    removeProduct,
    editProduct,
    getAllProducts,
  };
};

export default useProductActions;
