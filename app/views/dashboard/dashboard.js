import React from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import MailList from "./mailListComponent/mailList";
import NativeUi from "./nativeUiContentComponent/nativeUi";
import { width, height } from "react-native-dimension";
class Dashboard extends React.PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MailList style={{ flex: 2 }} />
        {/* //below for native component */}
        <NativeUi style={{ flex: 1 }} />
      </View>
    );
  }
}

export default Dashboard;
