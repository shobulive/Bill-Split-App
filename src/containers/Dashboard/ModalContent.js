import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import { ListItem, List, Text } from "native-base";
import totalProfitOrLoss from "./ProfitOrLoss";
import getNameFromNumber from "./getNameFromNumber";
function ModalContent(Users, final) {
  return (
    <ScrollView>
      <Image
        style={
          totalProfitOrLoss(final) ? (
            {
              alignSelf: "center"
            }
          ) : (
            {
              height: 100,
              width: 100,
              alignSelf: "center"
            }
          )
        }
        source={
          totalProfitOrLoss(final) ? (
            require("../../../img/GroupProfit.gif")
          ) : (
            require("../../../img/GroupLoss.jpg")
          )
        }
      />
      <List
        style={{ borderBottomWidth: 0 }}
        scrollEnabled={false}
        dataArray={final}
        renderRow={item => (
          <ListItem
            style={{
              borderBottomWidth: 0,
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                color: item.value < 0 ? "red" : "green",
                alignSelf: "center"
              }}
            >
              {item.value < 0 ? (
                "You Owe Rs." +
                (item.value * -1).toFixed(1) +
                " to " +
                getNameFromNumber(item.key, Users)
              ) : (
                "You Get Rs." +
                item.value.toFixed(1) +
                " from " +
                getNameFromNumber(item.key, Users)
              )}
            </Text>
          </ListItem>
        )}
      />
    </ScrollView>
  );
}
export default ModalContent;
