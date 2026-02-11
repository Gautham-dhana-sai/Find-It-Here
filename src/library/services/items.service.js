import { ApiLib} from "../common/apiLib";
import { ItemSettings } from "../settings/items.settings";

export class ItemsService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async createItem(body) {
        const url = ItemSettings.CREATE_ITEM;
        return await this._apiLib.callApi(url, "FILE_UPLOAD", body)
    }

    async getItemsPaginate(body) {
        const url = ItemSettings.GET_ITEMS_PAGINATE
        return await this._apiLib.callApi(url, "POST", body)
    }
}
