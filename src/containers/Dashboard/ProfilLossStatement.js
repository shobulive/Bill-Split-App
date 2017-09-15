import React, { Component } from "react";
import { Text } from "native-base";
function isProfit(User) {
  if (parseInt(User.UpAmt) > parseInt(User.DownAmt))
    return (
      <Text style={{ color: "green" }}>
        &#x25B2;Rs.{(parseInt(User.UpAmt) - parseInt(User.DownAmt)).toFixed(1)}
      </Text>
    );
  else
    return (
      <Text style={{ color: "red" }}>
        &#x25BC;Rs.{(parseInt(User.DownAmt) - parseInt(User.UpAmt)).toFixed(1)}
      </Text>
    );
}
export default isProfit;
