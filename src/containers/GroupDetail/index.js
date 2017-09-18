import React, { Component } from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import { Image, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import ModalCommon from "../../components/Modal";
import {
  Container,
  Button,
  Card,
  CardItem,
  Body,
  Content,
  Text,
  Item,
  List,
  ListItem,
  Left,
  Right,
  ActionSheet,
  Fab,
  Thumbnail
} from "native-base";
let trans = [];
let currentItem;
import Header from "../../components/Header";
import styles from "./styles";
import findGroup from "./FindGroup";
import findGroupName from "./FindGroupName";
import ModalContent from "./ModalContent";
import findWhoPaid from "./FindWhoPaid";
import renderTrans from "./RenderTransactions";
class GroupDetail extends Component {
  static navigationOptions = {
    title: "GroupDetail",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  setModalVisible(mythis, visible) {
    mythis.setState({ modalVisible: visible });
  }
  setCurrentItem(item) {
    currentItem = item;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
        <ModalCommon
          Title="CurrentTransactionDetail"
          isVisible={this.state.modalVisible}
          Content={ModalContent(
            currentItem,
            this.props.CurrentUser.User,
            this.props.Users
          )}
          toggleVisiblity={() => {
            this.setModalVisible(this, false);
          }}
        />
        <Header
          title={findGroupName(this.props.Groups, this.props.CurrentGroup)}
          imageUri={
            "https://api.adorable.io/avatars/285/abott@adorable." +
            findGroupName(this.props.Groups, this.props.CurrentGroup)
          }
          visibility="visible"
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back());
          }}
        />
        <Content padder style={styles.contentS}>
          <Text note style={styles.createdBy}>
            Created By{" "}
            {findWhoPaid(
              findGroup(this.props.Groups, this.props.CurrentGroup).CreatedBy,
              this.props.Users
            )}
          </Text>
          {renderTrans(
            this.props.Transactions,
            trans,
            this.setCurrentItem,
            this.setModalVisible,
            this.props.CurrentUser.User,
            this.props.Users,
            this.props.CurrentGroup,
            this
          )}
        </Content>
        <Fab
          style={styles.fab}
          position="bottomRight"
          onPress={() => {
            navigate("AddTranscation");
          }}
        >
          <Text>+</Text>
        </Fab>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    Users: state.fetchUser.users,
    CurrentUser: state.currentUser.CurrentUser,
    CurrentGroup: state.GroupClickReducer.CurrentGroup,
    Transactions: state.FetchTransactionReducer.trans,
    Groups: state.fetchGroups.groups
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchUsers: () => dispatch(FetchUsers()),
    FetchGroups: () => dispatch(FetchGroups()),
    FetchTransactions: () => dispatch(FetchTransactions()),
    LoginAction: CurrentUser => dispatch(LoginAction(CurrentUser))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
