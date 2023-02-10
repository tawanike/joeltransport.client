import { FetchWrapper } from "../_models/types";

const api = `/products`;

const getProducts = async (fetchWrapper: FetchWrapper) => fetchWrapper.get(`${api}`);

export const productService = {
    getProducts
}
