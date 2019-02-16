import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Dashboard from "./views/dashboard/dashboard";
const AppRouter = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Scene key="dashboard" component={Dashboard} initial />
      </Stack>
    </Router>
  );
};

export default AppRouter;
