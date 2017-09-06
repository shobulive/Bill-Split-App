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
import * as firebase from "firebase";
import fetchGroups from "../Actions/GetGroupsForUser";
import store from "../store";
let MembersInvoled = [];
let fields = [];
let n = 1;
@connect(store => {
  return { CurrentUser: store.currentUser.CurrentUser };
})
export default class AddGroup extends React.PureComponent {
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
  addField() {
    fields.push(
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Item floatingLabel style={{ flex: 5 }}>
          <Icon active name="person" />
          <Input
            keyboardType="numeric"
            key={n}
            placeholder={"#" + n + " Member"}
            button
            onFocus={() => {
              MembersInvoled.push("");
            }}
            onChange={((n, event) => {
              MembersInvoled[n] = event.nativeEvent.text;
            }).bind(this, n)}
          />
        </Item>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            danger
            onPress={n => {
              MembersInvoled.splice(n, 1);
              this.setState({ n: fields.splice(n, 1) });
            }}
          >
            <Text>-</Text>
          </Button>
        </View>
      </View>
    );
    this.setState({ n: n });
    n++;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content padder style={{ backgroundColor: "white" }}>
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
              onPress={async () => {
                this.setState({ loading: true });
                let newMembersArr = [];
                newMembersArr.push(this.props.CurrentUser.User.Phone);
                for (let i = 0; i < MembersInvoled.length; i++) {
                  if (MembersInvoled[i] !== "") {
                    newMembersArr.push(parseInt(MembersInvoled[i]));
                  }
                }
                if (
                  this.name !== "" &&
                  this.description !== "" &&
                  newMembersArr.length > 1
                ) {
                  let newGroup = {
                    Name: this.name,
                    CreateTime: this.creationDate,
                    LastUpdateTime: this.lastUpdate,
                    Members: Object.assign({}, newMembersArr),
                    Description: this.description,
                    CreatedBy: this.createdBy
                  };
                  await firebase
                    .database()
                    .ref()
                    .child("Main")
                    .child("Groups")
                    .push(newGroup);
                  fetchGroups(store.dispatch);
                  setTimeout(() => {
                    this.props.navigation.dispatch(NavigationActions.back());
                  }, 3000);
                }
              }}
            >
              <Text>
                {!this.state.loading ? (
                  "Create Group"
                ) : (
                  <Spinner style={{ width: 50, height: 30 }} color="white" />
                )}
              </Text>
            </Button>
          </Form>
        </Content>
        <Fab
          style={{ backgroundColor: "#EF5350" }}
          onPress={this.addField.bind(this)}
        >
          <Text style={{ fontSize: 26 }}>+</Text>
        </Fab>
      </Container>
    );
  }
}
