import { ApiLib} from "../common/apiLib";
import { BrandSettings } from "../settings/brands.settings";

export class BrandsService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async getBrands(body) {
        const url = BrandSettings.GET_BRANDS;
        return await this._apiLib.callApi(url, "POST", body)
    }

    async addBrand(body) {
        const url = BrandSettings.ADD_BRAND;
        return await this._apiLib.callApi(url, "POST", body)
    }
}
