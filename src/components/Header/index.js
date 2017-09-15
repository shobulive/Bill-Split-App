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
import styles from "./styles";
class HeaderCommon extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#fff" }}>
        <Left>
          <Button transparent onPress={this.props.onPress}>
            <Icon active style={styles.back} name="ios-arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        <Right>
          <Thumbnail
            style={[
              styles.thumbnailStyle,
              { backfaceVisibility: this.props.visibility }
            ]}
            source={{ uri: this.props.imageUri }}
          />
        </Right>
      </Header>
    );
  }
}
module.exports = HeaderCommon;
