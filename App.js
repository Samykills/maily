/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  View
} from "react-native";
import AppRouter from "./app/appRouter";
import { AppColors } from "theme";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const StatusBarComponent = () => {
  return Platform.OS == "ios" ? (
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor={AppColors.primary}
    />
  ) : (
    <View style={{ height: STATUSBAR_HEIGHT }}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={AppColors.primary}
      />
    </View>
  );
};

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        <AppRouter />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary
  }
});
