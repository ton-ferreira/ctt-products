export enum CategoryId {
  Food = "1335ba9f-4f68-4dc8-806f-701f6450ba79",
  Clothing = "89ff7f90-b188-4897-a67b-f15ab92aa9a7",
  Book = "f3bfb487-2775-45ae-9ec5-aae957044051",
}

export const CategoryLabels: Record<CategoryId, string> = {
  [CategoryId.Food]: "Food",
  [CategoryId.Clothing]: "Clothing",
  [CategoryId.Book]: "Book",
};
