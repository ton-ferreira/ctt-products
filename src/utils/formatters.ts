export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-PT", { minimumFractionDigits: 2 }).format(
    price
  );
};
