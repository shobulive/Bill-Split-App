import React, { Component } from "react";
import { Text, Body, ListItem, List } from "native-base";
import SelectPayer from "./SelectPayer";
import getNameFromNumber from "./getNameFromNumber";
function renderChoosePayer(
  AllMember,
  Users,
  User,
  onChangePayerState,
  setPayer,
  mythis
) {
  return (
    <List
      scrollEnabled={false}
      dataArray={AllMember}
      renderRow={item => (
        <ListItem
          button
          onPress={() =>
            SelectPayer(mythis, item, onChangePayerState, setPayer)}
        >
          <Body>
            <Text>
              {item == User.Phone ? "You" : getNameFromNumber(item, Users)}
            </Text>
          </Body>
        </ListItem>
      )}
    />
  );
}
export default renderChoosePayer;
