import { ProfileSettings } from "../settings/profile.settings";
import { ApiLib} from "../common/apiLib";

export class ProfileService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async getProfileData(body) {
        const url = ProfileSettings.GET_PROFILE_DATA;
        return await this._apiLib.callApi(url, "POST", body)
    }

    async getProfileItemsData() {
        const url = ProfileSettings.GET_PROFILE_ITEMS_DATA;
        return await this._apiLib.callApi(url, "GET")
    }
}
