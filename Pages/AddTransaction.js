import React, { Component } from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import { Image, View, ScrollView } from "react-native";
import fetchUsers from "../Actions/FetchUsers";
import {
  Container,
  Button,
  Icon,
  Text,
  Footer,
  Form,
  Item,
  Input,
  Label,
  Fab,
  Spinner,
  Body,
  Right,
  ListItem,
  List
} from "native-base";
import { connect } from "react-redux";
import * as firebase from "firebase";
const Header = require("../componentsCommon/Header");
import fetchTransaction from "../Actions/FetchTransactions";
import store from "../store";
import Expo from "expo";
let MembersInvoled = [];
let AllMember = [];
let payer;
@connect(store => {
  return {
    CurrentUser: store.currentUser.CurrentUser,
    Users: store.fetchUser.users,
    CurrentGroup: store.GroupClickReducer.CurrentGroup,
    Groups: store.fetchGroups
  };
})
export default class AddTransaction extends React.PureComponent {
  static navigationOptions = {
    title: "AddTransaction",
    header: null
  };
  constructor(props) {
    super(props);
    MembersInvoled = [];
    payer = 0;
    AllMember = [];
    this.state = { isSelected: 0, payer: 0, isSubmitting: false };
    this.For;
    this.Amt;
  }
  getNameFromNumber(Number) {
    let arrUsers = Object.values(this.props.Users);
    for (let i = 0; i < arrUsers.length; i++) {
      if (arrUsers[i].Phone == Number) {
        return arrUsers[i].Name;
      }
    }
  }
  y(item) {
    payer = item;
    this.setState({ payer: item });
  }
  x(item, Members) {
    MembersInvoled.indexOf(item) == -1
      ? MembersInvoled.push(item) && this.setState({ isSelected: item })
      : MembersInvoled.splice(MembersInvoled.indexOf(item), 1) &&
        this.setState({ isSelected: 1 });
  }
  async handleSubmit() {
    if (MembersInvoled.indexOf(this.props.CurrentUser.User.Phone) == -1) {
      MembersInvoled.push(this.props.CurrentUser.User.Phone);
    }
    if (MembersInvoled.indexOf(payer) == -1) {
      MembersInvoled.push(payer);
    }
    this.setState({ isSubmitting: true });
    let Transaction = {
      For: this.For,
      Amt: parseInt(this.Amt),
      GID: this.props.CurrentGroup,
      Members: MembersInvoled,
      PaidBy: payer,
      DateTime: new Date()
        .toString()
        .split(" ")
        .splice(1, 4)
        .join(" ")
    };
    let users = Object.values(this.props.Users);
    let userskeys = Object.keys(this.props.Users);
    await firebase
      .database()
      .ref()
      .child("Main")
      .child("Transactions")
      .push(Transaction);
    for (let i = 0; i < MembersInvoled.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (MembersInvoled[i] == users[j].Phone) {
          if (payer == users[j].Phone) {
            users[j].UpAmt = parseInt(users[j].UpAmt);
            users[j].UpAmt +=
              this.Amt / MembersInvoled.length * (MembersInvoled.length - 1);

            users[j].UpAmt = users[j].UpAmt.toFixed(1);
          } else {
            users[j].DownAmt = parseInt(users[j].DownAmt);
            users[j].DownAmt += this.Amt / MembersInvoled.length;
            users[j].DownAmt = users[j].DownAmt.toFixed(1);
          }
          await firebase
            .database()
            .ref()
            .child("Main")
            .child("Users")
            .child(userskeys[j])
            .update(users[j]);
        }
      }
    }
    fetchTransaction(store.dispatch);
    fetchUsers(store.dispatch);
    await setTimeout(() => {
      this.props.navigation.dispatch(NavigationActions.back());
    }, 3000);
  }
  renderChooseMembers() {
    let currGroupObj;
    let Members;
    if (this.props.Groups !== undefined) {
      let fetchedGroups = Object.values(this.props.Groups.groups);
      let fetchedGroupsKey = Object.keys(this.props.Groups.groups);
      for (let i = 0; i < fetchedGroups.length; i++) {
        if (fetchedGroupsKey[i] == this.props.CurrentGroup) {
          currGroupObj = fetchedGroups[i];
        }
      }
      Members = currGroupObj.Members.slice();
      AllMember = Members.slice();
      for (let i = 0; i < Members.length; i++) {
        if (Members[i] == this.props.CurrentUser.User.Phone) {
          Members.splice(i, 1);
          i = 0;
        }
      }
    }
    return (
      <List
        scrollEnabled={false}
        dataArray={Members}
        renderRow={item => (
          <ListItem button onPress={this.x.bind(this, item, Members)}>
            <Body>
              <Text>{this.getNameFromNumber(item)}</Text>
            </Body>
            <Right>
              <Text />
            </Right>
          </ListItem>
        )}
      />
    );
  }
  renderChoosePayer() {
    return (
      <List
        scrollEnabled={false}
        dataArray={AllMember}
        renderRow={item => (
          <ListItem button onPress={this.y.bind(this, item)}>
            <Body>
              <Text>
                {item == this.props.CurrentUser.User.Phone ? (
                  "You"
                ) : (
                  this.getNameFromNumber(item)
                )}
              </Text>
            </Body>
          </ListItem>
        )}
      />
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container
        padder
        style={{
          flex: 1,
          backgroundColor: "white",
          marginTop: Expo.Constants.statusBarHeight
        }}
      >
        <Header
          visibility="hidden"
          title="Add Transaction"
          imageUri="../img/GroupIcon.png"
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back());
          }}
        />
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <Form style={{ flex: 6 }}>
            <Item floatingLabel>
              <Icon active name="chatboxes" />
              <Input
                onChange={event => {
                  this.For = event.nativeEvent.text;
                }}
                placeholder="For"
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="chatboxes" />
              <Input
                onChange={event => {
                  this.Amt = event.nativeEvent.text;
                }}
                keyboardType="numeric"
                placeholder="Amt"
              />
            </Item>
            <Label>Who Attended The Event?</Label>
            {this.renderChooseMembers()}
            <Label>Who Paid?</Label>
            {this.renderChoosePayer()}
          </Form>
        </ScrollView>
        <Button full danger onPress={this.handleSubmit.bind(this)}>
          {this.state.isSubmitting ? (
            <Spinner color="white" style={{ width: 50, height: 30 }} />
          ) : (
            <Text>Submit</Text>
          )}
        </Button>
        <Footer
          style={{
            display: this.state.isSelected ? "flex" : "none"
          }}
        >
          <Body>
            <Text>Involved</Text>
            <List
              dataArray={MembersInvoled}
              renderRow={item => (
                <ListItem>
                  <Text>{this.getNameFromNumber(item)}</Text>
                </ListItem>
              )}
            />
          </Body>
          <Right>
            <Text>PaidBy</Text>
            <Text>
              {payer == this.props.CurrentUser.User.Phone ? (
                "You"
              ) : (
                this.getNameFromNumber(payer)
              )}
            </Text>
          </Right>
        </Footer>
      </Container>
    );
  }
}
