import { env } from "../../environments/env"

export const ItemSettings = {
    CREATE_ITEM: env.apiUrl + '/api/add-item',
    GET_ITEMS_PAGINATE: env.apiUrl + '/api/get-items/paginate'
}