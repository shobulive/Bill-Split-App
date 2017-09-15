import React, { Component } from "react";
import { View, Text, Right, Button } from "native-base";
import Modal from "react-native-modal";
import styles from "./styles";
class ModalCommon extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
        style={styles.MainModal}
      >
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Text style={styles.modalText}>{this.props.Title}</Text>
            <Right>
              <Button transparent onPress={this.props.toggleVisiblity}>
                <Text style={styles.close}>X</Text>
              </Button>
            </Right>
          </View>
          <View style={styles.mainContent}>{this.props.Content}</View>
        </View>
      </Modal>
    );
  }
}
module.exports = ModalCommon;
