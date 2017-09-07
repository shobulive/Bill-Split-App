import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  StatusBar
} from "react-native";
import axios from "axios";
const HEADER_MAX_HEIGHT = 190;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import { connect } from "react-redux";
import Modal from "react-native-modal";
import * as firebase from "firebase";
import {
  Card,
  CardItem,
  ActionSheet,
  Body,
  Button,
  Icon,
  ListItem,
  List,
  Text,
  Thumbnail,
  Left,
  Right,
  Fab
} from "native-base";
import Expo from "expo";
import fetchUsers from "../Actions/FetchUsers";
import LoginAction from "../Actions/LoginAction";
import fetchGroups from "../Actions/GetGroupsForUser";
import fetchTransaction from "../Actions/FetchTransactions";
import store from "../store";
import GroupClickAction from "../Actions/GroupClickAction";
import Swipeable from "react-native-swipeable";
let groups = [];
let currentGroup;
let final = [];
let imageurl;
@connect(store => {
  return {
    CurrentUser: store.currentUser.CurrentUser,
    Users: store.fetchUser.users,
    Groups: store.fetchGroups,
    groups,
    Transactions: store.FetchTransactionReducer.trans
  };
})
export default class Dashboard extends Component {
  static navigationOptions = {
    title: "Dashboard",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      hasToReload: false,
      scrollY: new Animated.Value(0),
      modalVisible: false,
      loadingImage: false
    };
  }
  async getImage() {
    await fetch(
      "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=SHubham"
    )
      .then(response => response.json())
      .then(responseData => {
        imageurl = responseData.data.image_url;
      })
      .done();
    this.setState({ loadingImage: true });
  }
  getNameFromNumber(Number) {
    for (let i in this.props.Users) {
      if (this.props.Users[i].Phone === Number) return this.props.Users[i].Name;
    }
  }
  getCurrentGroupInfo() {
    final = [];
    let totalOwe = [],
      totalGet = [];
    if (this.props.Groups.groups && currentGroup) {
      let fetchedGroups = Object.values(this.props.Groups.groups);
      let thisGroupTrans = [];
      let Members = currentGroup.value.Members.slice();
      let Transactions = Object.values(this.props.Transactions);
      for (let i = 0; i < Transactions.length; i++) {
        if (Transactions[i]) {
          if (Transactions[i].GID == currentGroup.key) {
            thisGroupTrans.push(Transactions[i]);
          }
        }
      }
      if (thisGroupTrans.length > 0) {
        for (let i = 0; i < thisGroupTrans.length; i++) {
          let currentMembersWithoutMe = thisGroupTrans[i].Members.slice();
          currentMembersWithoutMe.splice(
            currentMembersWithoutMe.indexOf(this.props.CurrentUser.User.Phone),
            1
          );
          if (thisGroupTrans[i].PaidBy == this.props.CurrentUser.User.Phone) {
            let justPushed;
            for (let j = 0; j < currentMembersWithoutMe.length; j++) {
              if (totalGet.length == 0) {
                totalGet.push({
                  key: currentMembersWithoutMe[j],
                  value:
                    thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
                });
              } else {
                let TotalGetKeys = [];
                for (let i = 0; i < totalGet.length; i++) {
                  TotalGetKeys.push(totalGet[i].key);
                }
                let exists = false;
                let x = 0;
                for (x = 0; x < TotalGetKeys.length; x++) {
                  if (TotalGetKeys[x] == currentMembersWithoutMe[j]) {
                    exists = true;
                    break;
                  }
                }
                if (exists) {
                  totalGet[x].value +=
                    thisGroupTrans[i].Amt /
                    (currentMembersWithoutMe.length + 1);
                } else {
                  totalGet.push({
                    key: currentMembersWithoutMe[j],
                    value:
                      thisGroupTrans[i].Amt /
                      (currentMembersWithoutMe.length + 1)
                  });
                }
              }
            }
          } else {
            if (totalOwe.length == 0) {
              totalOwe.push({
                key: thisGroupTrans[i].PaidBy,
                value:
                  thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
              });
            } else {
              let tempL = totalOwe.length;
              for (let m = 0; m < tempL; m++) {
                if (totalOwe[m].key == thisGroupTrans[i].PaidBy) {
                  totalOwe[m].value +=
                    thisGroupTrans[i].Amt /
                    (currentMembersWithoutMe.length + 1);
                  break;
                } else {
                  totalOwe.push({
                    key: thisGroupTrans[i].PaidBy,
                    value:
                      thisGroupTrans[i].Amt /
                      (currentMembersWithoutMe.length + 1)
                  });
                  break;
                }
              }
            }
          }
        }
      }

      let commonKeys = [];
      for (let i = 0; i < totalGet.length; i++) {
        for (let j = 0; j < totalOwe.length; j++) {
          if (totalOwe[j].key == totalGet[i].key) {
            final.push({
              key: totalOwe[j].key,
              value: totalGet[i].value - totalOwe[j].value
            });
            commonKeys.push(totalOwe[j].key);
          }
        }
      }
      for (let i = 0; i < totalGet.length; i++) {
        let found = false;
        for (let j = 0; j < commonKeys.length; j++) {
          if (commonKeys[j] == totalGet[i].key) found = true;
        }
        if (!found) {
          final.push({
            key: totalGet[i].key,
            value: totalGet[i].value
          });
        }
      }
      for (let i = 0; i < totalOwe.length; i++) {
        let found = false;
        for (let j = 0; j < commonKeys.length; j++) {
          if (commonKeys[j] == totalOwe[i].key) found = true;
        }
        if (!found) {
          final.push({
            key: totalOwe[i].key,
            value: -totalOwe[i].value
          });
        }
      }
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  isProfit() {
    if (this.props.CurrentUser.User.UpAmt > this.props.CurrentUser.User.DownAmt)
      return (
        <Text style={{ color: "green" }}>
          &#x25B2;Rs.{(this.props.CurrentUser.User.UpAmt -
            this.props.CurrentUser.User.DownAmt).toFixed(1)}
        </Text>
      );
    return (
      <Text style={{ color: "red" }}>
        &#x25BC;Rs.{(this.props.CurrentUser.User.DownAmt -
          this.props.CurrentUser.User.UpAmt).toFixed(1)}
      </Text>
    );
  }
  renderGroups() {
    groups = [];
    if (this.props.Groups.groups) {
      let fetchedGroups = Object.values(this.props.Groups.groups);
      let fetchedGroupsKey = Object.keys(this.props.Groups.groups);
      for (let group in fetchedGroups) {
        if (fetchedGroups[group]) {
          let MemberID = Object.values(fetchedGroups[group].Members);
          for (let mid in MemberID) {
            if (MemberID[mid] === this.props.CurrentUser.User.Phone) {
              groups.push({
                key: fetchedGroupsKey[group],
                value: fetchedGroups[group]
              });
              break;
            }
          }
        }
      }
      return (
        <FlatList
          style={{ marginTop: "47%" }}
          data={groups}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <Button
                  danger
                  onPress={() => {
                    ActionSheet.show(
                      {
                        options: ["Delete", "Cancel"],
                        cancelButtonIndex: 1,
                        title: "Are you sure you want to delete?"
                      },
                      async buttonIndex => {
                        if (buttonIndex === 0) {
                          await firebase
                            .database()
                            .ref()
                            .child("Main")
                            .child("Groups")
                            .child(item.key)
                            .remove();
                          if (this.props.Transactions) {
                            let fetchedTransactions = Object.values(
                              this.props.Transactions
                            );
                            let fetchedTransactionsKeys = Object.keys(
                              this.props.Transactions
                            );
                            for (
                              let i = 0;
                              i < fetchedTransactions.length;
                              i++
                            ) {
                              if (fetchedTransactions[i])
                                if (fetchedTransactions[i].GID == item.key) {
                                  await firebase
                                    .database()
                                    .ref()
                                    .child("Main")
                                    .child("Transactions")
                                    .child(fetchedTransactionsKeys[i])
                                    .remove();
                                }
                            }

                            let users = Object.values(this.props.Users);
                            let userskeys = Object.keys(this.props.Users);
                            let toBechangedUserKeys = [];
                            for (
                              let i = 0;
                              i < item.value.Members.length;
                              i++
                            ) {
                              for (let j = 0; j < users.length; j++) {
                                if (users[j])
                                  if (users[j].Phone == item.value.Members[i]) {
                                    toBechangedUserKeys.push(userskeys[j]);
                                  }
                              }
                            }
                            for (
                              let i = 0;
                              i < toBechangedUserKeys.length;
                              i++
                            ) {
                              for (let j = 0; j < userskeys.length; j++) {
                                if (userskeys[j]) {
                                  currentGroup = item;
                                  this.getCurrentGroupInfo();
                                  if (userskeys[j] == toBechangedUserKeys[i]) {
                                    for (let k = 0; k < final.length; k++) {
                                      if (users[j].Phone == final[k].key) {
                                        if (final[k].value > 0) {
                                          users[j].DownAmt = parseInt(
                                            users[j].DownAmt
                                          );
                                          users[j].DownAmt -= final[k].value;
                                        } else {
                                          users[j].DownAmt = parseInt(
                                            users[j].DownAmt
                                          );
                                          users[j].UpAmt += final[k].value;
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
                                }
                              }
                            }
                            for (let i = 0; i < final.length; i++) {
                              if (final[i].value < 0) {
                                this.props.CurrentUser.User.DownAmt = parseInt(
                                  this.props.CurrentUser.User.DownAmt
                                );
                                this.props.CurrentUser.User.DownAmt +=
                                  final[i].value;
                              } else {
                                this.props.CurrentUser.User.UpAmt = parseInt(
                                  this.props.CurrentUser.User.UpAmt
                                );
                                this.props.CurrentUser.User.UpAmt -=
                                  final[i].value;
                              }
                            }
                            let CurrentUserKey;
                            for (let z = 0; z < users.length; z++) {
                              if (
                                users[z].Phone ==
                                this.props.CurrentUser.User.Phone
                              ) {
                                CurrentUserKey = userskeys[z];
                              }
                            }
                            await firebase
                              .database()
                              .ref()
                              .child("Main")
                              .child("Users")
                              .child(CurrentUserKey)
                              .update(this.props.CurrentUser.User);
                          }
                        }
                        fetchTransaction(store.dispatch);
                        fetchGroups(store.dispatch);
                        fetchUsers(store.dispatch);
                        setTimeout(() => {
                          this.setState({ hasToReload: true });
                        }, 2500);
                      }
                    );
                  }}
                  style={{ height: "100%" }}
                >
                  <Icon name="trash" />
                </Button>,
                <Button
                  style={{ height: "100%" }}
                  onPress={() => {
                    currentGroup = item;
                    this.getCurrentGroupInfo();
                    this.setModalVisible(true);
                  }}
                >
                  <Icon name="nutrition" />
                </Button>
              ]}
            >
              <ListItem
                avatar
                button
                onPress={() => {
                  GroupClickAction(item.key);
                  this.props.navigation.navigate("GroupDetail");
                }}
              >
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        "https://api.adorable.io/avatars/100/abott@adorable." +
                        item.value.Name
                    }}
                  />
                </Left>
                <Body>
                  <Text>{item.value.Name}</Text>
                  <Text note>{item.value.Description}</Text>
                </Body>
                <Right>
                  <Text note>{item.value.LastUpdateTime}</Text>
                </Right>
              </ListItem>
            </Swipeable>
          )}
        />
      );
    }
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 87],
      outputRange: ["30%", "9%"],
      extrapolate: "clamp"
    });
    const hw = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [80, 55],
      extrapolate: "clamp"
    });
    const iRadiius = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [50, 35],
      extrapolate: "clamp"
    });
    const HeaderCardMove = this.state.scrollY.interpolate({
      inputRange: [0, 130],
      outputRange: ["-31%", "-98%"],
      extrapolate: "clamp"
    });
    const ImgMove = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: ["70%", "85%"],
      extrapolate: "clamp"
    });
    const ImgMoveVert = this.state.scrollY.interpolate({
      inputRange: [0, 10],
      outputRange: ["1%", ".3%"],
      extrapolate: "clamp"
    });
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.fill, { backgroundColor: "white" }]}>
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
              borderRadius: 20,
              marginTop: "115%",
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#EF5350",
                borderRadius: 15,
                flex: 1
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
                <Button transparent onPress={() => this.setModalVisible(false)}>
                  <Text style={{ color: "white" }}>X</Text>
                </Button>
              </Right>
            </View>
            <View
              style={{
                flex: 5
              }}
            >
              <List
                dataArray={final}
                renderRow={item => (
                  <ListItem>
                    <Text style={{ color: item.value < 0 ? "red" : "green" }}>
                      {item.value < 0 ? (
                        "You Owe Rs." +
                        (item.value * -1).toFixed(1) +
                        " to " +
                        this.getNameFromNumber(item.key)
                      ) : (
                        "You Get Rs." +
                        item.value.toFixed(1) +
                        " from " +
                        this.getNameFromNumber(item.key)
                      )}
                    </Text>
                  </ListItem>
                )}
              />
            </View>
          </View>
        </Modal>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={8}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          {this.state.hasToReload ? this.renderGroups() : this.renderGroups()}
        </ScrollView>
        <Fab
          onPress={() => navigate("AddGroup")}
          style={{ backgroundColor: "#EF5350" }}
        >
          <Text style={{ fontSize: 26 }}>+</Text>
        </Fab>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View style={styles.bar}>
            <Animated.View style={{ marginTop: HeaderCardMove, padding: 0 }}>
              <Card
                style={{
                  flex: 1,
                  width: "100%",
                  position: "absolute",
                  flexDirection: "column",
                  left: "-50.5%"
                }}
              >
                <CardItem style={{ flex: 1 }} header>
                  <Animated.Text style={{ fontSize: 26, opacity: opacity }}>
                    {"Welcome, " + this.props.CurrentUser.User.Name}
                  </Animated.Text>
                </CardItem>
                <CardItem style={{ flex: 2 }}>
                  <Body style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <Animated.Text style={{ opacity: opacity }}>
                        Current Status:
                        {this.isProfit()}
                      </Animated.Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center"
                      }}
                    >
                      <Left>
                        <Animated.Text
                          style={{
                            color: "red",
                            fontSize: 22,
                            padding: "2.5%",
                            opacity: opacity
                          }}
                        >
                          &#x25BC;Rs.{this.props.CurrentUser.User.DownAmt}
                        </Animated.Text>
                      </Left>
                      <Right>
                        <Animated.Text
                          style={{
                            color: "green",
                            fontSize: 22,
                            padding: "2.5%",
                            paddingBottom: "2.5%",
                            opacity: opacity
                          }}
                        >
                          &#x25B2;Rs.{this.props.CurrentUser.User.UpAmt}
                        </Animated.Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
                <CardItem
                  footer
                  style={{
                    backgroundColor: "#EF5350",
                    width: "100%",
                    flexDirection: "column"
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      alignSelf: "flex-start",
                      marginTop: 20
                    }}
                  >
                    Your Expense Groups
                  </Text>
                </CardItem>
              </Card>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.Image
          style={{
            position: "absolute",
            width: hw,
            height: hw,
            borderRadius: iRadiius,
            top: ImgMoveVert,
            left: ImgMove
          }}
          source={{
            uri:
              "https://api.adorable.io/avatars/200/abott@adorable." +
              this.props.CurrentUser.User.Name
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    marginTop: Expo.Constants.statusBarHeight
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden"
  },
  bar: {
    marginTop: "5%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18,
    marginTop: "-10%"
  }
});
