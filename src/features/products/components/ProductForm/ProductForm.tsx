import React, { useState, useEffect } from "react";
import { Product } from "../../stores/types/products";
import { CategoryId, CategoryLabels } from "../../stores/types/categories";
import "./ProductForm.style.scss";
import { useNavigate } from "react-router-dom";

interface IProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  isSubmitting?: boolean;
}

function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
}: IProductFormProps) {
  const emptyProduct: Product = {
    id: crypto.randomUUID(),
    description: "",
    price: 0,
    stock: 0,
    categories: [],
  };
  const [form, setForm] = useState<Product>(initialData ?? emptyProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange =
    (field: keyof Product) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "price" || field === "stock"
          ? Number(e.target.value)
          : e.target.value;
      setForm((prev: Product) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(
      (option) => option.value as CategoryId
    );
    setForm((prev) => ({ ...prev, categories: values }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card fade-in product-form-container"
    >
      <h1>{form.id ? "Edit Product" : "Add Product"}</h1>

      <label>Name</label>
      <input
        aria-label="description"
        type="text"
        value={form.description}
        onChange={handleChange("description")}
      />

      <label>Price</label>
      <input
        aria-label="price"
        type="number"
        value={form.price}
        onChange={handleChange("price")}
        step="any"
      />

      <label>Stock</label>
      <input
        aria-label="stock"
        type="number"
        value={form.stock}
        onChange={handleChange("stock")}
      />

      <label>Category</label>
      <select
        aria-label="categorias"
        multiple
        value={form.categories}
        onChange={handleCategoryChange}
      >
        {Object.entries(CategoryLabels).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>

      <button
        disabled={isSubmitting}
        className="secondary"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
      <button type="submit" disabled={isSubmitting} className="primary">
        {form.id ? "Save updates" : "Save product"}
      </button>
    </form>
  );
}

export default ProductForm;
