import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function renderProductDetail() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ProductDetail />
      </BrowserRouter>
    </Provider>
  );
}

describe("ProductDetail page", () => {
  it("should render the page layout", () => {
    renderProductDetail();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should show an informative banner", () => {
    renderProductDetail();
    expect(screen.getByTestId("product-detail-info")).toBeInTheDocument();
  });
});
