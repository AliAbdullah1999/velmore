export function formatPrice(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
