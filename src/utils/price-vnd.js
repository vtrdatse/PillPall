export const vndFormat = (price) => {
  if (typeof price != "number") return "";
  return price.toLocaleString() + " VND";
};
