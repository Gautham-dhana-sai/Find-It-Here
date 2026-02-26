import { ApiLib} from "../common/apiLib";
import { CategorySettings } from "../settings/categories.settings";

export class CategoriesService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async getCategories() {
        const url = CategorySettings.GET_CATEGORIES;
        return await this._apiLib.callApi(url, "GET")
    }

    async addCategory(body) {
        const url = CategorySettings.ADD_CATEGORY;
        return await this._apiLib.callApi(url, "POST", body)
    }
}
