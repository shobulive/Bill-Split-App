import React, { Component } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import findWhoPaid from "./FindWhoPaid";
import RecieveFrom from "./RecieveFrom";
function ModalContent(currentItem, User, Users) {
  return (
    <ScrollView>
      <View style={{ flex: 3, marginTop: "5%" }}>
        {currentItem ? (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View>
              {currentItem.value.PaidBy == User.Phone ? (
                <Text style={{ color: "red", alignSelf: "center" }}>
                  You Owe Nothing !!
                </Text>
              ) : (
                <View>
                  <Text style={{ color: "red", alignSelf: "center" }}>
                    {"You Owe "}
                    {" Rs." +
                      (currentItem.value.Amt /
                        currentItem.value.Members.length).toFixed(1) +
                      " to " +
                      findWhoPaid(currentItem.value.PaidBy, Users)}
                  </Text>
                  <Image
                    style={{
                      width: 100,
                      height: 120,
                      alignSelf: "center"
                    }}
                    source={require("../../../img/PayDay.png")}
                  />
                </View>
              )}
            </View>
            <View>
              {currentItem.value.PaidBy == User.Phone ? (
                RecieveFrom(currentItem, User, Users)
              ) : (
                <Text style={{ color: "green", alignSelf: "center" }}>
                  You Get Nothing!!!
                </Text>
              )}
            </View>
          </View>
        ) : (
          ""
        )}
      </View>
    </ScrollView>
  );
}
export default ModalContent;
