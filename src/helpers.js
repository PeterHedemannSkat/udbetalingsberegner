export function formatValuta(number) {
  number = Number(number);
  return (
    number.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " kr."
  );
}
