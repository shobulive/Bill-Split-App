import { View } from "react-native";
import { Button, Icon, Text, Item, Input } from "native-base";
import React, { Component } from "react";
function addField(fields, n, MembersInvoled) {
  debugger;
  fields.push(
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Item floatingLabel style={{ flex: 5 }}>
        <Icon active name="person" />
        <Input
          keyboardType="numeric"
          key={n}
          placeholder={"Please Input the Phone Number Required"}
          button
          onFocus={() => {
            MembersInvoled.push("");
          }}
          onChange={((n, event) => {
            MembersInvoled[n] = event.nativeEvent.text;
          }).bind(this, n)}
        />
      </Item>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          danger
          onPress={n => {
            debugger;
            MembersInvoled.splice(n, 1);
            this.setState({ n: fields.splice(n, 1) });
          }}
        >
          <Text>-</Text>
        </Button>
      </View>
    </View>
  );
  this.setState({ n: n });
}
export default addField;
