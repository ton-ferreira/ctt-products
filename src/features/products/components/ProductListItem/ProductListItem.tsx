import { CategoryLabels } from "../../stores/types/categories";
import { Product } from "../../stores/types/products";
import useProductActions from "../../hooks/useProductActions";
import { useNavigate } from "react-router-dom";

type IProductListItemProps = {
  product: Product;
};

function ProductListItem({ product }: IProductListItemProps) {
  const { removeProduct } = useProductActions();
  const navigate = useNavigate();

  return (
    <li key={product.id}>
      <span>{product.description}</span>
      <span>€{product.price}</span>
      <span>{product.stock}</span>
      {product.categories.map((category) => (
        <span key={category}>{CategoryLabels[category]}</span>
      ))}
      <button onClick={() => navigate(`product/${product.id}`)}>Edit</button>
      <button onClick={() => removeProduct(product.id)}>Remover</button>
    </li>
  );
}

export default ProductListItem;
