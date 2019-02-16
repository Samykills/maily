import { HttpClient } from "uRnFramework-basic-components";

class MailService {
  constructor() {
    let baseUrl = "http://www.mocky.io/v2/";
    headers = {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json"
    };
    this.httpClient = new HttpClient(baseUrl, headers, 10000);
  }

  getAllMails() {
    //url of the mocked service
    let url = "5c680f113800003318b10130";
    return this.httpClient.getApi(url);
  }
}

export default MailService;
