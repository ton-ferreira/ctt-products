import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Product } from "../../features/products/stores/types/products";
import ProductForm from "../../features/products/components/ProductForm/ProductForm";
import useProductActions from "../../features/products/hooks/useProductActions";

const ProductDetail = () => {
  const { id } = useParams();
  const isEdit = id !== "new";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.items);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Product | undefined>(
    undefined
  );

  const { getAllProducts, editProduct, addNewProduct } = useProductActions();

  useEffect(() => {
    const init = async () => {
      if (products.length === 0) {
        await getAllProducts();
      }
    };
    init();
  }, [dispatch, products.length]);

  useEffect(() => {
    if (isEdit) {
      const product = products.find((product) => product.id === id);
      if (product) setInitialData(product);
    }
  }, [isEdit, id, products]);

  const handleSubmit = async (data: Product) => {
    setLoading(true);
    try {
      if (isEdit) {
        await editProduct(data);
      } else {
        await addNewProduct({ ...data, id: crypto.randomUUID() });
      }
      navigate("/");
    } catch (err) {
      alert("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <p data-testid="product-detail-info">Info</p>
      <ProductForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={loading}
      />
    </main>
  );
};

export default ProductDetail;
