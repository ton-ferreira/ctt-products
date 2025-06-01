import { CategoryLabels } from "../../stores/types/categories";
import { Product } from "../../stores/types/products";
import useProductActions from "../../hooks/useProductActions";

type IProductListItemProps = {
  product: Product;
};

function ProductListItem({ product }: IProductListItemProps) {
  const { removeProduct } = useProductActions();

  return (
    <li key={product.id}>
      <span>{product.description}</span>
      <span>€{product.price}</span>
      <span>{product.stock}</span>
      {product.categories.map((category) => (
        <span key={category}>{CategoryLabels[category]}</span>
      ))}
      <button>Edit</button>
      <button onClick={() => removeProduct(product.id)}>Remover</button>
    </li>
  );
}

export default ProductListItem;
