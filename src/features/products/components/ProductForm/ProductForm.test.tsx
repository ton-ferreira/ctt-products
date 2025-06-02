import { fireEvent, render, screen } from "@testing-library/react";
import { Product } from "../../stores/types/products";
import { CategoryId, CategoryLabels } from "../../stores/types/categories";
import { UUID } from "crypto";
import ProductForm from "./ProductForm";
import { BrowserRouter } from "react-router-dom";

const mockProduct: Product = {
  id: "d6572d5b-ca73-4acd-8122-1c29b12a89ae",
  description: "T-shirt",
  price: 9.99,
  stock: 3,
  categories: [CategoryId.Clothing],
};

describe("ProductForm", () => {
  beforeAll(() => {
    global.crypto = {
      ...global.crypto,
      randomUUID: jest.fn(() => mockProduct.id as UUID),
    };
  });

  it("should render empty fields when no initialData is provided", () => {
    render(
      <BrowserRouter>
        <ProductForm onSubmit={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(1);
    expect(screen.getByLabelText(/Stock/i)).toHaveValue(1);
  });

  it("should render with initialData values in edit mode", () => {
    render(
      <BrowserRouter>
        <ProductForm initialData={mockProduct} onSubmit={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      mockProduct.description
    );
    expect(screen.getByLabelText(/Price/i)).toHaveValue(mockProduct.price);
    expect(screen.getByLabelText(/Stock/i)).toHaveValue(mockProduct.stock);
  });

  it("should allow typing into the fields", () => {
    render(
      <BrowserRouter>
        <ProductForm onSubmit={jest.fn()} />
      </BrowserRouter>
    );

    const descriptionInput = screen.getByLabelText(/description/i);
    fireEvent.change(descriptionInput, {
      target: { value: mockProduct.description },
    });
    expect(descriptionInput).toHaveValue(mockProduct.description);
  });

  it("should call onSubmit with the correct data when submitted", () => {
    const handleSubmit = jest.fn();
    render(
      <BrowserRouter>
        <ProductForm onSubmit={handleSubmit} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: mockProduct.description },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: mockProduct.price },
    });
    fireEvent.change(screen.getByLabelText(/Stock/i), {
      target: { value: mockProduct.stock },
    });

    const firstCategoryLabel = CategoryLabels[CategoryId.Clothing];
    const checkbox = screen.getByLabelText(
      firstCategoryLabel
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        description: mockProduct.description,
        price: mockProduct.price,
        stock: mockProduct.stock,
        categories: mockProduct.categories,
      })
    );
  });

  it("should disable submit button if isSubmitting is true", () => {
    render(
      <BrowserRouter>
        <ProductForm onSubmit={jest.fn()} isSubmitting={true} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
  });
});
