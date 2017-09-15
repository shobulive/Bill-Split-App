import React, { Component } from "react";
import { Image } from "react-native";
import {
  Card,
  CardItem,
  Body,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail
} from "native-base";
import findWhoPaid from "./FindWhoPaid";
function renderTrans(
  Transactions,
  trans,
  setCurrentItem,
  setModalVisible,
  User,
  Users,
  CurrentGroup,
  mythis
) {
  trans = [];
  if (Transactions) {
    let fetchedTransactions = Object.values(Transactions);
    let fetchedTransactionsKey = Object.keys(Transactions);
    for (let transaction in fetchedTransactions) {
      if (fetchedTransactions[transaction] !== null) {
        if (fetchedTransactions[transaction].GID == CurrentGroup) {
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
              setCurrentItem(item);
              setModalVisible(mythis, true);
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
                      {item.value.PaidBy === User.Phone ? (
                        "nil"
                      ) : (
                        (item.value.Amt /
                          Object.values(item.value.Members).length).toFixed(1)
                      )}, Paid by:
                      {item.value.PaidBy === User.Phone ? (
                        "You"
                      ) : (
                        findWhoPaid(item.value.PaidBy, Users)
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
                      item.value.For
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
export default renderTrans;
