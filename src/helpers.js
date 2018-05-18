export function formatPrice(price) {
  return price.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN"
  });
}
