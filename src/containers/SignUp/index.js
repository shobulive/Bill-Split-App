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
import Header from "../../components/Header";
import { connect } from "react-redux";
import SignUpForm from "../../components/SignUpForm";
import isValidate from "./Validation";
import Expo from "expo";
import API from "../../services/FirebaseAPI";
import FetchUsers from "../../store/Users/action";
class SignUp extends Component {
  static navigationOptions = {
    title: "SignUp",
    header: null
  };
  constructor(props) {
    super(props);
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
                if (isValidate(this.props.newUser)) {
                  new API().AddUser({
                    Name: this.props.newUser.values.name,
                    Password: this.props.newUser.values.password,
                    Phone: parseInt(this.props.newUser.values.phone),
                    Email: this.props.newUser.values.email,
                    UpAmt: 0,
                    DownAmt: 0
                  });
                  this.props.FetchUsers();
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
function mapStateToProps(state) {
  return {
    newUser: state.form.SignUpForm
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchUsers: () => dispatch(FetchUsers())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
