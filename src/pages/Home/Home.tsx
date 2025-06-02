import { useSelector } from "react-redux";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import ProductListItem from "../../features/products/components/ProductListItem/ProductListItem";
import { RootState } from "../../store";
import useProductActions from "../../features/products/hooks/useProductActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.style.scss";

function Home() {
  const { error, items } = useSelector((state: RootState) => state.products);
  const { getAllProducts } = useProductActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      getAllProducts();
    }
  }, []);

  return (
    <div>
      <header>
        <h2 data-testid="welcome-message">Welcome to CTT Products!</h2>
        <p>Manage all your products in one place.</p>
      </header>
      <main className="home-container">
        <section className="card product-add-container">
          <h3>Your Products</h3>
          <div>
            <button className="primary" onClick={() => navigate("product/new")}>
              Add new product
            </button>
          </div>
        </section>
        <section className="card">
          {items.length > 0 && (
            <ul>
              {items.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </ul>
          )}
          {items.length === 0 && (
            <EmptyCard
              title="No products yet!"
              description="Add your products whenever you're ready. :)"
            />
          )}
          {error && <ErrorCard errorMessage="error" />}
        </section>
      </main>
    </div>
  );
}

export default Home;
