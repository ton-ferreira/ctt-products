import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import * as api from "../../../features/products/api";
import { Product } from "../../../features/products/stores/types/products";

const mockProduct: Product = {
  id: "c112bd93-7792-4afa-8bea-aa1b6ccdfb75",
  stock: 1,
  description: "Some nice product",
  categories: [],
  price: 10.0,
};

function renderHome() {
  return render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

describe("Home page", () => {
  it("should show a welcome message when the page loads", () => {
    renderHome();
    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
  });

  it("should show a product list if api return items", async () => {
    jest.spyOn(api, "fetchProducts").mockResolvedValueOnce([mockProduct]);
    renderHome();
    await waitFor(() => {
      expect(screen.getByText(/Some nice product/i));
    });
  });

  it("should show a empty warn if api doesn't return items", async () => {
    jest.spyOn(api, "fetchProducts").mockResolvedValueOnce([]);
    renderHome();
    await waitFor(() => {
      expect(screen.getByText(/No products yet/i));
    });
  });
});
