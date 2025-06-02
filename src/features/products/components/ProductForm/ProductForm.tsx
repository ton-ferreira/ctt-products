import React, { useState, useEffect } from "react";
import { Product } from "../../stores/types/products";
import { CategoryId, CategoryLabels } from "../../stores/types/categories";

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
    <form onSubmit={handleSubmit}>
      <h1>{form.id ? "Editar Produto" : "Adicionar Produto"}</h1>

      <label>
        Name:
        <input
          aria-label="description"
          type="text"
          value={form.description}
          onChange={handleChange("description")}
        />
      </label>

      <label>
        Price:
        <input
          aria-label="price"
          type="number"
          value={form.price}
          onChange={handleChange("price")}
        />
      </label>

      <label>
        Stock:
        <input
          aria-label="stock"
          type="number"
          value={form.stock}
          onChange={handleChange("stock")}
        />
      </label>

      <label>
        Category:
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
      </label>

      <button type="submit" disabled={isSubmitting}>
        {form.id ? "Save updates" : "Save product"}
      </button>
    </form>
  );
}

export default ProductForm;
