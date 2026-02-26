import { env } from "../../environments/env"

export const CategorySettings = {
    GET_CATEGORIES: env.apiUrl + '/api/get-categories',
    ADD_CATEGORY: env.apiUrl + '/api/add-category',
}