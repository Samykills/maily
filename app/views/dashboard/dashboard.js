import React from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import MailList from "./mailListComponent/mailList";
import NativeUi from "./nativeUiContentComponent/nativeUi";
class Dashboard extends React.PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MailList />
        {/* //below for native component */}
        <NativeUi />
      </View>
    );
  }
}

export default Dashboard;
