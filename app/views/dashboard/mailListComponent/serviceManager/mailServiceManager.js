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
            //add ismarkedRead thing as well
            let results = res.data.messages;
            this._processReceivedMails(results);
            resolve(results);
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

  _processReceivedMails(mailList) {
    mailList.forEach(element => {
      element.isMarkedRead = false;
    });
  }
}
export default MailServiceManager;
