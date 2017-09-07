import React, { Component } from "react";
import {
  Header,
  Button,
  Title,
  Left,
  Right,
  Body,
  Thumbnail,
  Icon
} from "native-base";

class HeaderCommon extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#fff" }}>
        <Left>
          <Button transparent onPress={this.props.onPress}>
            <Icon active name="ios-arrow-back" />
          </Button>
        </Left>
        <Body style={{ marginLeft: "-20%" }}>
          <Title style={{ alignSelf: "flex-start" }}>{this.props.title}</Title>
        </Body>
        <Right>
          <Thumbnail
            style={{
              backfaceVisibility: this.props.visibility,
              marginTop: "-10%"
            }}
            source={{ uri: this.props.imageUri }}
          />
        </Right>
      </Header>
    );
  }
}
module.exports = HeaderCommon;
