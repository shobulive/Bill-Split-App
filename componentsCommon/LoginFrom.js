import React, { Component } from "react";
import Expo from "expo";
import { View } from "react-native";
import {
  Container,
  Item,
  Input,
  Header,
  Body,
  Content,
  Title,
  Button,
  Text,
  Icon,
  Label
} from "native-base";
import { Field, reduxForm } from "redux-form";
let isFocused = false;
const validate = values => {
  const error = {};
  error.email = "";
  error.name = "";
  let email = values.email;
  let password = values.password;
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (values.email === undefined) {
    email = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (isFocused) {
    if (!re.test(email)) {
      error.email = "Invalid Email";
    }
    if (password === "") {
      error.password = "Required";
    }
  }
  return error;
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.renderInput = this.renderInput.bind(this);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    let currlabel;
    let icon;
    let secureInput;
    if (input.name === "password") {
      currlabel = "Password";
      icon = "key";
      secureInput = true;
    } else if (input.name === "email") {
      currlabel = "Email";
      icon = "person";
      secureInput = false;
    }
    let hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item inlineLabel style={{ margin: 10 }} error={hasError}>
        <Icon style={{ color: "black" }} active name={icon} />
        <Input
          {...input}
          placeholder={currlabel}
          secureTextEntry={secureInput}
          onFocus={() => {
            isFocused = true;
          }}
        />
        {hasError ? <Text style={{ color: "red" }}>{error}</Text> : <Text />}
      </Item>
    );
  }
  render() {
    const { handleSubmit, reset } = this.props;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <View>
        <Field name="email" component={this.renderInput} />
        <Field name="password" component={this.renderInput} />
      </View>
    );
  }
}

export default reduxForm({
  form: "test",
  validate
})(LoginForm);
