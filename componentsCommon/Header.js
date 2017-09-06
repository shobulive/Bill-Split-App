import React, { Component } from "react";
import {
  Header,
  Button,
  Icon,
  Title,
  Left,
  Right,
  Body,
  Thumbnail
} from "native-base";

class HeaderCommon extends Component {
  render() {
    return (
      <Header
        button
        onPress={this.props.onPress ? this.props.onPress : () => {}}
        style={{ backgroundColor: this.props.backgroundColor }}
      >
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Thumbnail
            style={{ backfaceVisibility: this.props.visibility }}
            source={{ uri: this.props.imageUri }}
          />
        </Right>
      </Header>
    );
  }
}
module.exports = HeaderCommon;
