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
const validate = values => {
  const error = {};
  error.email = "";
  error.name = "";
  let email = values.email;
  let password = values.password;
  let confirmpassword = values.confirmpassword;
  let phone = values.phone;
  let name = values.name;
  let reName = /^[A-z]+$/;
  let reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (values.email === undefined) {
    email = "";
  }
  if (values.confirmpassword === undefined) {
    passwoconfirmpasswordrd = "";
  }
  if (values.phone === undefined) {
    phone = "";
  }
  if (values.name === undefined) {
    name = "";
  }
  if (values.password === undefined) {
    password = "";
  }
  if (!reEmail.test(email)) {
    error.email = "Invalid Email";
  }
  if (password === "") {
    error.password = "Required";
  }
  if (!reName.test(name)) {
    error.name = "Invalid Name";
  }
  if (phone.length !== 10) {
    error.phone = "Invalid Phone Number";
  }
  if (password !== "" && confirmpassword !== password) {
    error.confirmpassword = "Not Matching";
  }
  return error;
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
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
    } else if (input.name === "confirmpassword") {
      currlabel = "Confirm Password";
      icon = "key";
      secureInput = true;
    } else if (input.name === "phone") {
      currlabel = "Phone";
      icon = "calculator";
      secureInput = false;
    } else if (input.name === "name") {
      currlabel = "Name";
      icon = "body";
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
        />
        {hasError ? <Text style={{ color: "red" }}>{error}</Text> : <Text />}
      </Item>
    );
  }
  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <View>
        <Field name="name" component={this.renderInput} />
        <Field name="email" component={this.renderInput} />
        <Field name="phone" component={this.renderInput} />
        <Field name="password" component={this.renderInput} />
        <Field name="confirmpassword" component={this.renderInput} />
      </View>
    );
  }
}

export default reduxForm({
  form: "SignUpForm",
  validate
})(LoginForm);
