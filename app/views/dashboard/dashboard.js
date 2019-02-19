import React from "react";
import { View } from "react-native";
import MailList from "./mailListComponent/mailList";
import ContentComponent from "./ContentComponent/contentComponent";
import { width, height } from "react-native-dimension";
class Dashboard extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MailList style={{ flex: 2 }} />
        <ContentComponent style={{ flex: 1 }} />
      </View>
    );
  }
}

export default Dashboard;
