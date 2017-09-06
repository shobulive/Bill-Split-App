import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { Provider } from "react-redux";
import Dashboard from "./Pages/Dashboard";
import AddGroup from "./Pages/AddGroup";
import GroupDetail from "./Pages/GroupDetail";
import AddTranscation from "./Pages/AddTransaction";
const App = StackNavigator(
  {
    Home: { screen: Login },
    SignUp: { screen: SignUp },
    Dashboard: { screen: Dashboard },
    AddGroup: { screen: AddGroup },
    GroupDetail: { screen: GroupDetail },
    AddTranscation: { screen: AddTranscation }
  },
  { headerMode: "screen" }
);
export default () => (
  <Root>
    <Provider store={require("./store")}>
      <App />
    </Provider>
  </Root>
);
