import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";
import useProductActions from "../../../features/products/hooks/useProductActions";

jest.mock("../../../features/products/hooks/useProductActions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetAllProducts = jest.fn();

const mockProduct = {
  id: "123",
  description: "Test product",
  price: 9.99,
  stock: 2,
  categories: [],
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
    jest.clearAllMocks();
    (useProductActions as jest.Mock).mockReturnValue({
      getAllProducts: mockGetAllProducts,
    });
  });

  it("should show welcome message", () => {
    renderHome();
    expect(screen.getByTestId("welcome-message")).toBeInTheDocument();
  });

  it("should show empty message if no products", async () => {
    mockGetAllProducts.mockResolvedValueOnce([]);
    renderHome();
    await waitFor(() => {
      expect(screen.getByText(/no products yet/i)).toBeInTheDocument();
    });
  });
});
