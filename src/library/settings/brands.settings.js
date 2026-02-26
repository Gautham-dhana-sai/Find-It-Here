import { env } from "../../environments/env"

export const BrandSettings = {
    GET_BRANDS: env.apiUrl + '/api/get-brands',
    ADD_BRAND: env.apiUrl + '/api/add-brand',
}