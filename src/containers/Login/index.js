import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Image, StyleSheet } from "react-native";
import { Container, Button, Content, Text, Spinner } from "native-base";
import { connect } from "react-redux";
import Expo from "expo";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginFrom";
import FetchUsers from "../../store/Users/action";
import FetchGroups from "../../store/Groups/action";
import FetchTransactions from "../../store/Transactions/action";
import LoginAction from "../../store/SignIn/action";
import styles from "./Styles";
let currentUser = {};
class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      error: false,
      isLoading: false
    };
  }
  componentDidMount() {
    this.props.FetchUsers();
    this.props.FetchGroups();
    this.props.FetchTransactions();
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf")
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
        <Container style={{ backgroundColor: "#D12030" }}>
          <Content padder style={styles.contentStyle}>
            <Image
              source={require("../../../img/fav_icon.jpeg")}
              style={styles.logo}
            />
            <LoginForm />
            <Button
              full
              light
              onPress={() => {
                if (this.isValidate()) {
                  this.setState({ isLoading: true });
                  this.setState({ error: false });
                  this.props.LoginAction(currentUser);
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
            <Text note style={styles.error}>
              {this.state.error ? "Error:Invalid Credentials" : ""}
            </Text>
            <Text style={styles.textCommon}>Not Registered with Us Yet?</Text>
            <Button
              transparent
              onPress={() => {
                navigate("SignUp");
              }}
              style={styles.button}
            >
              <Text style={styles.textCommon}>SignUp</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    Users: state.fetchUser.users,
    CurrentInput: state.form.test
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchUsers: () => dispatch(FetchUsers()),
    FetchGroups: () => dispatch(FetchGroups()),
    FetchTransactions: () => dispatch(FetchTransactions()),
    LoginAction: CurrentUser => dispatch(LoginAction(CurrentUser))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
