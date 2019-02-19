import MailService from "../service/mailService";
import moment from "moment-timezone";

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
            this._sortResultsBasedOnTime(results);
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

  _sortResultsBasedOnTime(results) {
    results.sort(function(a, b) {
      let dateA = moment.unix(a.time_sent);
      let dateB = moment.unix(b.time_sent);
      return dateA - dateB;
    });
  }

  _processReceivedMails(mailList) {
    mailList.forEach(element => {
      element.isMarkedRead = false;
    });
  }
}
export default MailServiceManager;
