import { env } from "../../environments/env"

export const ProfileSettings = {
    GET_PROFILE_DATA: env.loginApiUrl + '/api/profile/data',
    GET_PROFILE_ITEMS_DATA: env.apiUrl + '/api/profile/items/data'
}