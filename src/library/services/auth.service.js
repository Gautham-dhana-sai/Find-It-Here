import { AuthSettings } from "../settings/auth.settings";
import { ApiLib} from "../common/apiLib";

export class AuthService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async signUpUser(body) {
        const url = AuthSettings.CREATE_USER;
        return await this._apiLib.callApi(url, "LOGIN", body)
    }

    async verifyOtp(body) {
        const url = AuthSettings.VERIFY_SIGNUP;
        return await this._apiLib.callApi(url, "LOGIN", body)
    }

    async loginUser(body) {
        const url = AuthSettings.LOGIN_USER;
        return await this._apiLib.callApi(url, "LOGIN", body)
    }
}
