export const AppConfig = {
  title: "Kasitu Boutique",
  description: "Where Style Meets Elegance in Every Stitch.",
  apiURL: "http://127.0.0.1:8000/api",
  imgURL: "http://localhost:3000/product/",
};

export const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .replace(/(\.|,)00$/g, "");

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
