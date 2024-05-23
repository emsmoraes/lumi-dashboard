export function formatCurrency(value: number) {
  if (typeof value !== "number") {
    return "Valor inválido";
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
