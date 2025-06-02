import { fireEvent, render, screen } from "@testing-library/react";
import { Product } from "../../stores/types/products";
import { CategoryId } from "../../stores/types/categories";
import { UUID } from "crypto";
import ProductForm from "./ProductForm";

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
    render(<ProductForm onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
    expect(screen.getByLabelText(/Price/i)).toHaveValue(0);
    expect(screen.getByLabelText(/Stock/i)).toHaveValue(0);
  });

  it("should render with initialData values in edit mode", () => {
    render(<ProductForm initialData={mockProduct} onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      mockProduct.description
    );
    expect(screen.getByLabelText(/Price/i)).toHaveValue(mockProduct.price);
    expect(screen.getByLabelText(/Stock/i)).toHaveValue(mockProduct.stock);
  });

  it("should allow typing into the fields", () => {
    render(<ProductForm onSubmit={jest.fn()} />);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: mockProduct.description } });
    expect(nameInput).toHaveValue(mockProduct.description);
  });

  it("should call onSubmit with the correct data when submitted", () => {
    const handleSubmit = jest.fn();
    render(<ProductForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: mockProduct.description },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: mockProduct.price },
    });
    fireEvent.change(screen.getByLabelText(/Stock/i), {
      target: { value: mockProduct.stock },
    });

    const categortSelect = screen.getByLabelText(
      /Category/i
    ) as HTMLSelectElement;

    fireEvent.change(categortSelect, {
      target: { value: CategoryId.Clothing },
    });

    fireEvent.click(screen.getByRole("button"));

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
    render(<ProductForm onSubmit={jest.fn()} isSubmitting={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
