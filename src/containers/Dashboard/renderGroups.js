import React, { Component } from "react";
import Swipeable from "react-native-swipeable";
import { FlatList } from "react-native";
import {
  ActionSheet,
  Body,
  Button,
  Icon,
  ListItem,
  List,
  Text,
  Thumbnail,
  Left,
  Right
} from "native-base";
import DeleteButtonPress from "./DeleteButtonPress";
import getCurrentGroupInfo from "./GroupInfo";
function wait(ms, cb) {
  var waitDateOne = new Date();
  while (new Date() - waitDateOne <= ms) {
    //Nothing
  }
  if (cb) {
    eval(cb);
  }
}
function renderGroups(
  groups,
  Groups,
  User,
  navigate,
  Transactions,
  Users,
  LoginAction,
  fetchTransaction,
  fetchGroups,
  fetchUsers,
  setModalVisible,
  GroupClickAction,
  final,
  currentGroup,
  mythis
) {
  groups = [];
  if (Groups.groups) {
    let fetchedGroups = Object.values(Groups.groups);
    let fetchedGroupsKey = Object.keys(Groups.groups);
    let CurrentUserKey;
    for (let group in fetchedGroups) {
      if (fetchedGroups[group]) {
        let MemberID = Object.values(fetchedGroups[group].Members);
        for (let mid in MemberID) {
          if (MemberID[mid] === User.Phone) {
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
                    buttonIndex => {
                      if (buttonIndex === 0) {
                        DeleteButtonPress(
                          item,
                          Transactions,
                          Users,
                          LoginAction,
                          fetchTransaction,
                          fetchGroups,
                          fetchUsers,
                          User
                        );
                      }
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
                  getCurrentGroupInfo(
                    final,
                    item,
                    Groups.groups,
                    Transactions,
                    User
                  );
                  setModalVisible(mythis, true);
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
                navigate("GroupDetail");
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
export default renderGroups;
