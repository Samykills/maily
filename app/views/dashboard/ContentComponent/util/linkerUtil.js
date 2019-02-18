import { AppContext } from "react-native-easystore";
class LinkerUtil {
  onPressToggleReadButton = () => {
    let appContext = AppContext.getAppContext();
    appContext.selectedMail.isMarkedRead = this._toggleMarkAsRead(
      appContext.selectedMail.isMarkedRead
    );
    appContext.refreshEmailList = true;
    AppContext.setAppContext(appContext);
  };

  _toggleMarkAsRead = value => {
    if (value) {
      return false;
    } else {
      return true;
    }
  };
}

export default LinkerUtil;
