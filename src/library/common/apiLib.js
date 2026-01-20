import axios from "axios";
import { EncryptLib } from "./encryptLib";

export class ApiLib {
  constructor(encryptLib = new EncryptLib()) {
    this._encryptLib = encryptLib;
  }

  async firstFunction() {
    console.log("first");
  }

  async callApi(url, method, body = null) {
    try {
      const METHOD = method.toUpperCase();
      let response = null
      switch (METHOD) {
        case "GET":
          body = this._encryptLib.encrypt(body)
          break;
        case "LOGIN": 
          body = this._encryptLib.encrypt({...body, project: null})
          response = await axios.post(url, body);
          return this._encryptLib.decrypt(response.data);
        case "POST": 
          body = this._encryptLib.encrypt(body)
          response = await axios.post(url, body);
          return this._encryptLib.decrypt(response.data);
        case "FILE_UPLOAD": 
          response = await axios.post(url, body);
          return this._encryptLib.decrypt(response.data);
        case "TPA-P":
          response = await axios.post(url, body);
          return response.data;
      }
    } catch (error) {
      console.log("Error at callApi", error);
    }
  }
}
