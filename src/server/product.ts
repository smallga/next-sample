import axios from "axios";

export async function getProduct() {
  const { data: response } = await axios(
    `https://res.cloudinary.com/smallga/raw/upload/v1543484994/jsonData/productList.json`
  );
  return response;
}