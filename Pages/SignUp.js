import React, { Component } from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import { Image, View } from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Text,
  Footer,
  Form,
  Item,
  Input,
  Label
} from "native-base";
let itemRef;
const Header = require("../componentsCommon/Header");
import * as firebase from "firebase";
import { connect } from "react-redux";
import SignUpForm from "../componentsCommon/SignUpForm";
import Expo from "expo";
@connect(store => {
  return { newUser: store.form.SignUpForm };
})
export default class SignUp extends Component {
  static navigationOptions = {
    title: "SignUp",
    header: null
  };
  constructor(props) {
    super(props);
  }
  isValidate() {
    if (this.props.newUser.values === undefined) return false;
    let reName = /^[A-z]+$/;
    let reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("here");
    if (reName.test(this.props.newUser.values.name)) {
      if (reEmail.test(this.props.newUser.values.email)) {
        if (this.props.newUser.values.phone.length == 10) {
          if (
            this.props.newUser.values.password + "" ===
            this.props.newUser.values.confirmpassword + ""
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={{ flex: 1, marginTop: Expo.Constants.statusBarHeight }}>
        <Header
          visibility="hidden"
          title="SignUp"
          imageUri="../img/GroupIcon.png"
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back());
          }}
        />
        <Content padder style={{ backgroundColor: "white" }}>
          <Form>
            <SignUpForm />
            <Button
              full
              danger
              onPress={() => {
                if (this.isValidate()) {
                  firebase
                    .database()
                    .ref()
                    .child("Main")
                    .child("Users")
                    .push({
                      Name: this.props.newUser.values.name,
                      Password: this.props.newUser.values.password,
                      Phone: parseInt(this.props.newUser.values.phone),
                      Email: this.props.newUser.values.email,
                      UpAmt: 0,
                      DownAmt: 0
                    });
                  this.props.navigation.dispatch(NavigationActions.back());
                }
              }}
            >
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
