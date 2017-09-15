import React, { Component } from "react";
import { Text, Body, Right, ListItem, List } from "native-base";
import getNameFromNumber from "./getNameFromNumber";
import SelectAttendees from "./SelectAttendees";
function renderChooseMembers(
  Groups,
  CurrentGroup,
  AllMember,
  MembersInvoled,
  User,
  Users,
  mythis,
  onChangeState
) {
  let currGroupObj;
  let Members;
  if (Groups) {
    let fetchedGroups = Object.values(Groups.groups);
    let fetchedGroupsKey = Object.keys(Groups.groups);
    for (let i = 0; i < fetchedGroups.length; i++) {
      if (fetchedGroupsKey[i] == CurrentGroup) {
        currGroupObj = fetchedGroups[i];
      }
    }
    Members = currGroupObj.Members.slice();
    if (AllMember.length != Members.length) {
      AllMember.length = 0;
      for (let i = 0; i < Members.length; i++) {
        AllMember.push(Members[i]);
      }
    }
    for (let i = 0; i < Members.length; i++) {
      if (Members[i] == User.Phone) {
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
        <ListItem
          button
          onPress={() => {
            SelectAttendees(mythis, item, MembersInvoled, onChangeState);
          }}
        >
          <Body>
            <Text>{getNameFromNumber(item, Users)}</Text>
          </Body>
          <Right>
            <Text />
          </Right>
        </ListItem>
      )}
    />
  );
}
export default renderChooseMembers;
