export function formatValuta(number) {
  number = Number(number);
  return (
    number.toLocaleString("da-DK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " kr."
  );
}

export function fradrag(skattekort, fradrag, udbetalingsFrekvens) {
  let reeltfradrag = skattekort === "hovedkort" ? fradrag : 0;

  if (udbetalingsFrekvens === "fjortendage") {
    reeltfradrag = reeltfradrag * 0.4615;
  }

  return reeltfradrag;
}
