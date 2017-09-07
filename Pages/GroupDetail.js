import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Image, View, FlatList } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import PieChart from "react-native-pie-chart";
import {
  Container,
  Button,
  Card,
  CardItem,
  Body,
  Content,
  Text,
  Item,
  List,
  ListItem,
  Left,
  Right,
  ActionSheet,
  Fab,
  Thumbnail
} from "native-base";
let BUTTONS = [];
let CANCEL_INDEX = 4;
let trans = [];
let currentItem;
const Header = require("../componentsCommon/Header");
import Expo from "expo";
@connect(store => {
  return {
    Users: store.fetchUser.users,
    CurrentUser: store.currentUser.CurrentUser,
    CurrentGroup: store.GroupClickReducer.CurrentGroup,
    Transactions: store.FetchTransactionReducer.trans,
    Groups: store.fetchGroups.groups
  };
})
export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  findGroupName() {
    if (this.props.Groups) {
      for (let i in Object.keys(this.props.Groups)) {
        if (Object.keys(this.props.Groups)[i] === this.props.CurrentGroup) {
          return this.props.Groups[Object.keys(this.props.Groups)[i]].Name;
        }
      }
    }
  }
  findGroup() {
    if (this.props.Groups) {
      for (let i in Object.keys(this.props.Groups)) {
        if (Object.keys(this.props.Groups)[i] == this.props.CurrentGroup) {
          return this.props.Groups[Object.keys(this.props.Groups)[i]];
        }
      }
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  RecieveFrom(currentItem) {
    let tempMembers = currentItem.value.Members.slice();
    tempMembers.splice(
      tempMembers.indexOf(this.props.CurrentUser.User.Phone),
      1
    );
    return (
      <List
        scrollEnabled={false}
        dataArray={tempMembers}
        renderRow={item => (
          <ListItem>
            <Text note>
              Rs.{(currentItem.value.Amt /
                currentItem.value.Members.length).toFixed(1)}{" "}
              from {this.findWhoPaid(item)}
            </Text>
          </ListItem>
        )}
      />
    );
  }
  findWhoPaid(PaidBy) {
    for (let i in this.props.Users) {
      if (this.props.Users[i].Phone === PaidBy) return this.props.Users[i].Name;
    }
  }
  renderTrans() {
    trans = [];
    if (this.props.Transactions) {
      let fetchedTransactions = Object.values(this.props.Transactions);
      let fetchedTransactionsKey = Object.keys(this.props.Transactions);
      for (let transaction in fetchedTransactions) {
        if (fetchedTransactions[transaction] !== null) {
          if (fetchedTransactions[transaction].GID == this.props.CurrentGroup) {
            trans.push({
              key: fetchedTransactionsKey[transaction],
              value: fetchedTransactions[transaction]
            });
          }
        }
      }
      return (
        <List
          dataArray={trans}
          renderRow={item => (
            <ListItem
              button
              onPress={() => {
                currentItem = item;
                this.setModalVisible(true);
              }}
            >
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri:
                          "https://api.adorable.io/avatars/100/abott@adorable." +
                          item.value.For
                      }}
                    />
                    <Body>
                      <Text>{item.value.For}</Text>
                      <Text note>
                        Total: Rs.{item.value.Amt}/-, Your Share:{" "}
                        {item.value.PaidBy ===
                        this.props.CurrentUser.User.Phone ? (
                          "nil"
                        ) : (
                          item.value.Amt /
                          Object.values(item.value.Members).length
                        )}, Paid by:
                        {item.value.PaidBy ===
                        this.props.CurrentUser.User.Phone ? (
                          "You"
                        ) : (
                          this.findWhoPaid(item.value.PaidBy)
                        )}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri:
                        "https://api.adorable.io/avatars/285/abott@adorable." +
                        item.value.For +
                        "aaaa"
                    }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Right>
                    <Text note>{item.value.DateTime}</Text>
                  </Right>
                </CardItem>
              </Card>
            </ListItem>
          )}
        />
      );
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{
            height: "50%"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: "50%",
              borderColor: "gray",
              borderStyle: "solid",
              borderWidth: 1,
              marginTop: "106%",
              borderRadius: 20
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#EF5350",
                  borderRadius: 15
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    marginLeft: 10
                  }}
                >
                  Current Transaction's Details
                </Text>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.setModalVisible(false)}
                  >
                    <Text style={{ color: "white" }}>X</Text>
                  </Button>
                </Right>
              </View>
              <View style={{ flex: 3, marginLeft: "15%", marginTop: "5%" }}>
                {currentItem ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Text style={{ color: "red" }}>You Owe</Text>
                      {currentItem.value.PaidBy ==
                      this.props.CurrentUser.User.Phone ? (
                        <Text>Nil</Text>
                      ) : (
                        <View>
                          <Text>
                            Rs.{(currentItem.value.Amt /
                              currentItem.value.Members.length).toFixed(1)}{" "}
                            to {this.findWhoPaid(currentItem.value.PaidBy)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                      <Text style={{ color: "green" }}>You Get</Text>
                      {currentItem.value.PaidBy ==
                      this.props.CurrentUser.User.Phone ? (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column"
                          }}
                        >
                          {this.RecieveFrom(currentItem)}
                        </View>
                      ) : (
                        <Text>Nil</Text>
                      )}
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            </View>
          </View>
        </Modal>
        <Header
          backgroundColor="white"
          title={this.findGroupName()}
          imageUri={
            "https://api.adorable.io/avatars/285/abott@adorable." +
            this.findGroupName()
          }
          visibility="visible"
        />
        <Content padder style={{ backgroundColor: "white" }}>
          <Text
            note
            style={{
              alignSelf: "center",
              borderColor: "#ccc",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 5
            }}
          >
            Created By {this.findWhoPaid(this.findGroup().CreatedBy)}
          </Text>
          {this.renderTrans()}
        </Content>
        <Fab
          style={{ backgroundColor: "#EF5350" }}
          position="bottomRight"
          onPress={() => {
            navigate("AddTranscation");
          }}
        >
          <Text style={{ fontSize: 26 }}>+</Text>
        </Fab>
      </Container>
    );
  }
}
