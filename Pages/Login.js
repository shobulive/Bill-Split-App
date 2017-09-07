import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Image } from "react-native";
import { Container, Button, Content, Text, Spinner } from "native-base";
import * as firebase from "firebase";
const Header = require("../componentsCommon/Header");
import { connect } from "react-redux";
import fetchUsers from "../Actions/FetchUsers";
import LoginAction from "../Actions/LoginAction";
import fetchGroups from "../Actions/GetGroupsForUser";
import fetchTransaction from "../Actions/FetchTransactions";
import store from "../store";
import Expo from "expo";
import LoginForm from "../componentsCommon/LoginFrom";
let currentUser = {};

@connect(store => {
  return {
    Users: store.fetchUser.users,
    CurrentInput: store.form.test
  };
})
export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };
  constructor(props) {
    super(props);
    fetchUsers(store.dispatch);
    fetchGroups(store.dispatch);
    fetchTransaction(store.dispatch);
    this.state = {
      isReady: false,
      error: false,
      isLoading: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  isValidate() {
    let input = {};
    if (this.props.CurrentInput.values !== undefined)
      input = this.props.CurrentInput.values;
    let users = Object.values(this.props.Users);
    for (let item in users) {
      if (
        users[item].Email === input.email &&
        users[item].Password + "" === input.password + ""
      ) {
        currentUser.User = users[item];
        return true;
      }
    }
    return false;
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    } else {
      const { navigate } = this.props.navigation;
      return (
        <Container>
          <Content padder style={{ backgroundColor: "white" }}>
            <Image
              source={require("../img/fav_icon.jpeg")}
              style={{ alignSelf: "center", marginTop: "10%" }}
            />
            <LoginForm />
            <Button
              full
              danger
              onPress={() => {
                if (this.isValidate()) {
                  this.setState({ isLoading: true });
                  this.setState({ error: false });
                  LoginAction(currentUser);
                  navigate("Dashboard");
                  setTimeout(() => this.setState({ isLoading: false }), 2000);
                } else {
                  this.setState({ isLoading: false });
                  this.setState({ error: true });
                }
              }}
            >
              {this.state.isLoading ? (
                <Spinner color="white" />
              ) : (
                <Text>Log In</Text>
              )}
            </Button>
            <Text note style={{ alignSelf: "center", color: "red" }}>
              {this.state.error ? "Error:Invalid Credentials" : ""}
            </Text>
            <Text style={{ alignSelf: "center" }}>
              Not Registered with Us Yet?
            </Text>
            <Button
              transparent
              danger
              onPress={() => {
                navigate("SignUp");
              }}
              style={{ alignSelf: "center" }}
            >
              <Text>SignUp</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}
