import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
import LinkerUtil from "../views/dashboard/contentComponent/util/linkerUtil";
import { AppContext } from "react-native-easystore";
import AppContextStore from "appStore";
import SplashScreen from "react-native-splash-screen";
class AppInitializationService {
  static initalizeApp() {
    //initalize app store
    AppContext.setAppContext(AppContextStore);
    //initalize batchedBridge for callback from native code
    const linkerUtil = new LinkerUtil();
    BatchedBridge.registerCallableModule("LinkerUtil", linkerUtil);
    SplashScreen.hide();
  }
}
export default AppInitializationService;
