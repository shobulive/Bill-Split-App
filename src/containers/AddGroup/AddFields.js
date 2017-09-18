import { View } from "react-native";
import { Button, Icon, Text, Item, Input } from "native-base";
import React, { Component } from "react";
function addField(fields, n, MembersInvoled, firstTime) {
  let x = 0;

  if (n == 1) MembersInvoled.length = 0;
  fields.push(
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Item floatingLabel style={{ flex: 5 }}>
        <Icon active name="person" />
        <Input
          keyboardType="numeric"
          key={n}
          placeholder={"Please Input the Phone Number Required"}
          button
          onBlur={() => {
            if (x.length == 10 && !MembersInvoled.includes(x))
              MembersInvoled.push(x);
            console.log(MembersInvoled);
          }}
          onChange={((n, event) => {
            x = event.nativeEvent.text;
          }).bind(this, n)}
        />
      </Item>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          danger
          onPress={n => {
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
