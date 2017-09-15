import React, { Component } from "react";
import { List, ListItem } from "native-base";
import { View, Image, Text } from "react-native";
import findWhoPaid from "./FindWhoPaid";
function RecieveFrom(currentItem, User, Users) {
  let tempMembers = currentItem.value.Members.slice();
  tempMembers.splice(tempMembers.indexOf(User.Phone), 1);
  return (
    <View>
      <List
        scrollEnabled={false}
        dataArray={tempMembers}
        renderRow={item => (
          <ListItem
            style={{
              padding: 0,
              margin: 0,
              borderBottomWidth: 0,
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                color: "green",
                alignSelf: "center"
              }}
            >
              You Get Rs.{(currentItem.value.Amt /
                currentItem.value.Members.length).toFixed(1)}{" "}
              from {findWhoPaid(item, Users)}
            </Text>
          </ListItem>
        )}
      />
      <Image
        style={{
          width: 100,
          height: 120,
          alignSelf: "center"
        }}
        source={require("../../../img/GetMoney.jpg")}
      />
    </View>
  );
}
export default RecieveFrom;
