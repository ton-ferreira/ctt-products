import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../stores/types/products";
import { CategoryId, CategoryLabels } from "../../stores/types/categories";
import "./ProductForm.style.scss";

interface Props {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  isSubmitting?: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
}: Props) {
  const emptyProduct: Product = {
    id: crypto.randomUUID(),
    description: "",
    price: 1,
    stock: 1,
    categories: [],
  };
  const [form, setForm] = useState<Product>(initialData ?? emptyProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const updateField = (
    field: keyof Product,
    value: string | number | CategoryId[]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange =
    (field: keyof Product) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateField(field, value);
    };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const id = value as CategoryId;
    const updated = checked
      ? [...form.categories, id]
      : form.categories.filter((c) => c !== id);
    updateField("categories", updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card fade-in product-form-container"
    >
      <h1>{initialData ? "Edit Product" : "Add Product"}</h1>

      <label>Name</label>
      <input
        required
        type="text"
        aria-label="description"
        value={form.description}
        onChange={handleInputChange("description")}
      />

      <label>Price</label>
      <input
        required
        type="number"
        value={form.price}
        onChange={handleInputChange("price")}
        inputMode="decimal"
        step="any"
        min={1}
      />

      <label>Stock</label>
      <input
        required
        type="number"
        value={form.stock}
        onChange={handleInputChange("stock")}
        inputMode="numeric"
        min={1}
      />

      <label>Categories</label>
      <div className="multi-checkbox-group">
        {Object.entries(CategoryLabels).map(([id, label]) => (
          <label key={id} className="checkbox-option">
            <input
              type="checkbox"
              value={id}
              checked={form.categories.includes(id as CategoryId)}
              onChange={handleCategoryChange}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="product-form-btn-container">
        <button
          type="button"
          className="secondary"
          disabled={isSubmitting}
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button type="submit" className="primary" disabled={isSubmitting}>
          {initialData ? "Save updates" : "Save product"}
        </button>
      </div>
    </form>
  );
}
