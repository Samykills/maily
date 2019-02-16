import React from "react";
import { View, Text } from "react-native";
import { AppColors } from "theme";
import SplashScreen from "react-native-splash-screen";
class Dashboard extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View>
        <Text style={{ color: AppColors.primary }}>dashboard</Text>
      </View>
    );
  }
}

export default Dashboard;
