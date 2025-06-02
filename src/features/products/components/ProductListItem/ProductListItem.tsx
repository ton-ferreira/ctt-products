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
    <li key={product.id} className="product-item-info-container ">
      <div>
        <h4>{product.description}</h4>
      </div>
      <div className="product-item-chip-list">
        <div className="chip">
          <span>€ {product.price}</span>
        </div>
        <div className="chip">
          <span>{product.stock} in stock</span>
        </div>
        {product.categories.map((category) => (
          <div key={category} className="chip">
            <span>{CategoryLabels[category]}</span>
          </div>
        ))}
      </div>

      <div className="product-action-btn-container">
        <button onClick={() => navigate(`product/${product.id}`)}>Edit</button>
        <button onClick={() => removeProduct(product.id)}>Remove</button>
      </div>
    </li>
  );
}

export default ProductListItem;
