export function toCurrency(n: number) {
  return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
}
