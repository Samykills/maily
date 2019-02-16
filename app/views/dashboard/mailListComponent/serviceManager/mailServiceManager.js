import MailService from "../service/mailService";

class MailServiceManager {
  constructor() {
    this.mailService = new MailService();
  }

  getAllMails() {
    return new Promise((resolve, reject) => {
      this.mailService.getAllMails().then(
        res => {
          if (res.status == 200) {
            resolve(res.data.messages);
          } else {
            res.data ? reject(res.data.message) : reject(res.problem);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
export default MailServiceManager;
