import FirebaseConfigJS from "./src/services/FirebaseConfig";
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { Root } from "native-base";
import Login from "./src/containers/Login/index";
import SignUp from "./src/containers/SignUp/index";
import Dashboard from "./src/containers/Dashboard/index";
import AddGroup from "./src/containers/AddGroup/index";
import GroupDetail from "./src/containers/GroupDetail/index";
import AddTranscation from "./src/containers/AddTransaction/index";
FirebaseConfigJS();
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
    <Provider store={require("./src/store/store")}>
      <App />
    </Provider>
  </Root>
);
