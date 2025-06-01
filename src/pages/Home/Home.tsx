import { useSelector } from "react-redux";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import ProductListItem from "../../features/products/components/ProductListItem/ProductListItem";
import { RootState } from "../../store";
import useProductActions from "../../features/products/hooks/useProductActions";
import { useEffect } from "react";

function Home() {
  const { error, items } = useSelector((state: RootState) => state.products);
  const { getAllProducts } = useProductActions();

  useEffect(() => {
    if (items.length === 0) {
      getAllProducts();
    }
  }, []);

  return (
    <>
      <header>
        <h2 data-testid="welcome-message">Welcome to CTT Products!</h2>
        <p>Manage all your products in one place.</p>
      </header>
      <main>
        <section>
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
    </>
  );
}

export default Home;
