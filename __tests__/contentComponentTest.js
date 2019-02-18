/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import React from "react";
import ContentComponent from "../app/views/dashboard/contentComponent/contentComponent";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
jest.useFakeTimers();
it("contentView renders correctly", () => {
  const tree = renderer.create(<ContentComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
