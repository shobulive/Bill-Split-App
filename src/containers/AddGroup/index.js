import React, { Component } from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import { View, FlatList } from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Fab,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import styles from "./styles";
import FetchGroups from "../../store/Groups/action";
import AddGroupLogic from "./AddGroupLogic";
import addField from "./AddFields";
import Header from "../../components/Header";
let MembersInvoled = [];
let fields = [];
let n = 1;
class AddGroup extends React.PureComponent {
  static navigationOptions = {
    title: "AddGroup",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.creationDate = new Date()
      .toString()
      .split(" ")
      .splice(1, 4)
      .join(" ");
    this.description = "";
    this.name = "";
    this.lastUpdate = new Date()
      .toString()
      .split(" ")
      .splice(1, 4)
      .join(" ");
    this.createdBy = this.props.CurrentUser.User.Phone;
    fields = [];
    n = 1;
  }
  onLoading(mythis, loading) {
    mythis.setState({ loading: loading });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container padder style={styles.fill}>
        <Header
          visibility="hidden"
          title="Add Group"
          imageUri="../img/GroupIcon.png"
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back());
          }}
        />
        <Content padder style={styles.contentS}>
          <Form>
            <Item floatingLabel>
              <Icon active name="chatboxes" />
              <Label>Group Name</Label>
              <Input
                onChange={event => {
                  this.name = event.nativeEvent.text;
                }}
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="paper" />
              <Label>Description</Label>
              <Input
                onChange={event => {
                  this.description = event.nativeEvent.text;
                }}
              />
            </Item>
            <FlatList
              data={fields}
              renderItem={({ item }) => item}
              extraData={this.state}
            />
            <Button
              full
              danger
              onPress={() => {
                AddGroupLogic(
                  this,
                  this.onLoading,
                  MembersInvoled,
                  this.props.FetchGroups,
                  NavigationActions,
                  this.props.navigation.dispatch,
                  this.props.CurrentUser.User,
                  this.name,
                  this.description,
                  this.creationDate,
                  this.lastUpdate,
                  this.createdBy
                );
              }}
            >
              <Text>
                {!this.state.loading ? (
                  "Create Group"
                ) : (
                  <Spinner style={styles.spinner} color="white" />
                )}
              </Text>
            </Button>
          </Form>
        </Content>
        <Fab
          style={styles.fab}
          onPress={addField.bind(this, fields, n++, MembersInvoled)}
        >
          <Text style={{ fontSize: 26 }}>+</Text>
        </Fab>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    CurrentUser: state.currentUser.CurrentUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchGroups: () => dispatch(FetchGroups())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
