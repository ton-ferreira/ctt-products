import { render, screen } from "@testing-library/react";
import { CategoryId, CategoryLabels } from "../../stores/types/categories";
import { store } from "../../../../store";
import { Provider } from "react-redux";

const mockedProduct = {
  id: "c112bd93-7792-4afa-8bea-aa1b6ccdfb75",
  stock: 1,
  description: "Some nice product",
  categories: [CategoryId.Food],
  price: 10.0,
};

describe("ProductListItem", () => {
  it("should show the products info received by its props", () => {
    render(
      <Provider store={store}>
        <ProductListItem product={mockedProduct} />
      </Provider>
    );
    expect(screen.getByText(mockedProduct.stock)).toBeInTheDocument();
    expect(screen.getByText(mockedProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(CategoryLabels[CategoryId.Food])
    ).toBeInTheDocument();
    expect(screen.getByText(mockedProduct.price)).toBeInTheDocument();
  });
});
