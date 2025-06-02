import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { Product } from "../../../features/products/stores/types/products";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import useProductActions from "../../../features/products/hooks/useProductActions";

const mockGetAllProducts = jest.fn();

jest.mock("../../../features/products/hooks/useProductActions", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getAllProducts: jest.fn(),
  })),
}));

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
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
}

describe("Home page", () => {
  beforeEach(() => {
    (useProductActions as jest.Mock).mockImplementation(() => ({
      getAllProducts: mockGetAllProducts,
    }));
  });
  it("should show a welcome message when the page loads", () => {
    renderHome();
    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
  });

  it("should show a product list if api return items", async () => {
    mockGetAllProducts.mockResolvedValueOnce([mockProduct]);

    renderHome();
    await waitFor(() => {
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });
  });

  it("should show a empty warn if api doesn't return items", async () => {
    mockGetAllProducts.mockReturnValueOnce(Promise.resolve([]));
    renderHome();
    await waitFor(() => {
      expect(screen.getByText(/No products yet/i));
    });
  });
});
