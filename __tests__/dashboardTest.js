/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import React from "react";
import Dashboard from "../app/views/dashboard/dashboard";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
//mock the hide function of splashscreen

jest.useFakeTimers();
jest.mock("react-native-splash-screen", () => ({
  hide: jest.fn()
}));
it("Dashboard renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
