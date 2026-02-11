import { ApiLib} from "../common/apiLib";
import { FilesSettings } from "../settings/files.settings";

export class FilesService{

    constructor(apiLib = new ApiLib()) {
        this._apiLib = apiLib
    }
    
    async getFile(fileName) {
        const url = FilesSettings.GET_FILE + '?filePath=' + fileName
        return this._apiLib.callApi(url, "GET")
    }
    
}