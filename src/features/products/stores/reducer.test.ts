const mockProduct = {
  id: "c112bd93-7792-4afa-8bea-aa1b6ccdfb75",
  stock: 1,
  description: "Some nice product",
  categories: [],
  price: 10.0,
};

const initialState = {
  items: [],
  loading: false,
  error: null,
};

describe("productsReducer", () => {
  it("should set the list of products in state when SET_PRODUCTS is dispatched", () => {
    const action = setProducts([mockProduct]);
    const newState = productsReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(mockProduct);
  });

  it("should add a new product to the list when ADD_PRODUCT is dispatched", () => {
    const action = addProduct(mockProduct);
    const newState = productsReducer(initialState, action);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(mockProduct);
  });

  it("should ignore delete if product ID is not found", () => {
    const state = {
      ...initialState,
      items: [mockProduct],
    };

    const newState = productsReducer(state, deleteProduct("wrong-id"));

    expect(newState.items).toHaveLength(1);
    expect(newState.items).toEqual(state.items);
  });

  it("shoudl remove the product with the given ID when DELETE_PRODUCT is dispatched", () => {
    const state = {
      ...initialState,
      items: [mockProduct],
    };
    const action = deleteProduct(mockProduct.id);
    const newState = productsReducer(state, action);
    expect(newState.items).toHaveLength(0);
  });

  it("should update the product when UPDATE_PRODUCT is dispatched", () => {
    const updatedProduct = {
      ...mockProduct,
      description: "Updated product",
    };
    const state = {
      ...initialState,
      items: [mockProduct],
    };
    const action = updateProduct(updatedProduct);
    const newState = productsReducer(state, action);
    expect(newState.items[0].description).toBe("Updated product");
  });

  it("should ignore the update if product ID is not found", () => {
    const state = {
      ...initialState,
      items: [mockProduct],
    };
    const notFoundProduct = {
      ...mockProduct,
      id: "wrong-id",
      description: "Isso non ecziste! :D",
    };

    const newState = productsReducer(state, updateProduct(notFoundProduct));

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].description).toBe(mockProduct.description);
  });

  it("should set loading to true when SET_LOADING is dispatched", () => {
    const action = setLoading(true);
    const newState = productsReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it("should set an error message when SET_ERROR is dispatched", () => {
    const action = setError("Failed to load!");
    const newState = productsReducer(initialState, action);
    expect(newState.error).toBe("Failed to load!");
  });
});
