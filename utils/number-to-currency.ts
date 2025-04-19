type CurrencyFormat = "USD" | "NGN" | "";

/**
 *
 * @param amount
 * @param currency
 * @returns Currency format as a String with USD symbol before the amount.
 */
export default function formatToCurrency(
  amount: number | string,
  currency: CurrencyFormat
): string {
  // Convert input to a number if it's a string
  let numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Ensure the input is a valid number
  if (isNaN(numericAmount)) {
    return `${currency}0`.trim();
  }

  // Format the number with no decimal places and customize separator
  // return `${currency}${numericAmount.toLocaleString("en-US", {
  return `${numericAmount.toLocaleString("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`.replace(",", ","); // Replace comma with comma (for consistency)
}
