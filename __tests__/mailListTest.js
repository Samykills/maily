/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import React from "react";
import MailList from "../app/views/dashboard/mailListComponent/mailList";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
jest.useFakeTimers();
it("mailList renders correctly", () => {
  const tree = renderer.create(<MailList />).toJSON();
  expect(tree).toMatchSnapshot();
});
