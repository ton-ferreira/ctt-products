import { CategoryLabels } from "../../stores/types/categories";
import { Product } from "../../stores/types/products";
import useProductActions from "../../hooks/useProductActions";
import { useNavigate } from "react-router-dom";
import "./ProductListItem.style.scss";

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
      <div className="product-action-btn-container">
        <button onClick={() => navigate(`product/${product.id}`)}>Edit</button>
        <button onClick={() => removeProduct(product.id)}>Remove</button>
      </div>
    </li>
  );
}

export default ProductListItem;
