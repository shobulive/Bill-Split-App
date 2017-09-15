import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Animated, Image, ScrollView, View } from "react-native";
import { Card, CardItem, Body, Text, Left, Right, Fab } from "native-base";
import { connect } from "react-redux";
import ModalCommon from "../../components/Modal";
import renderGroups from "./renderGroups";
import totalProfitOrLoss from "./renderGroups";
import styles from "./styles";
import DeleteButtonPress from "./DeleteButtonPress";
import FetchUsers from "../../store/Users/action";
import LoginAction from "../../store/SignIn/action";
import FetchGroups from "../../store/Groups/action";
import FetchTransactions from "../../store/Transactions/action";
import GroupClickAction from "../../store/GroupClick/action";
import ModalContent from "./ModalContent";
import getCurrentGroupInfo from "./GroupInfo";
import isProfit from "./ProfilLossStatement";
let groups = [];
let currentGroup;
let final = [];
let showModal = false;
class Dashboard extends Component {
  static navigationOptions = {
    title: "Dashboard",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      modalVisible: false
    };
  }
  setModalVisible(mythis, visible) {
    mythis.setState({ modalVisible: visible });
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 132],
      outputRange: ["30%", "9%"],
      extrapolate: "clamp"
    });
    const hw = this.state.scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: [80, 55],
      extrapolate: "clamp"
    });
    const iRadius = this.state.scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [40, 30],
      extrapolate: "clamp"
    });
    const HeaderCardMove = this.state.scrollY.interpolate({
      inputRange: [0, 128],
      outputRange: ["0%", "-32%"],
      extrapolate: "clamp"
    });
    const ImgMove = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: ["70%", "85%"],
      extrapolate: "clamp"
    });
    const ImgMoveVert = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: ["1%", ".3%"],
      extrapolate: "clamp"
    });
    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.fill}>
        <ModalCommon
          Title="CurrentGroupDetail"
          isVisible={this.state.modalVisible}
          Content={ModalContent(this.props.Users, final)}
          toggleVisiblity={() => {
            this.setModalVisible(this, false);
          }}
        />
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={8}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          {this.state.hasToReload ? (
            renderGroups(
              groups,
              this.props.Groups,
              this.props.CurrentUser.User,
              this.props.navigation.navigate,
              this.props.Transactions,
              this.props.Users,
              this.props.LoginAction,
              this.props.FetchTransactions,
              this.props.FetchGroupsA,
              this.props.FetchUsers,
              this.setModalVisible,
              this.GroupClickAction,
              final,
              currentGroup,
              this
            )
          ) : (
            renderGroups(
              groups,
              this.props.Groups,
              this.props.CurrentUser.User,
              this.props.navigation.navigate,
              this.props.Transactions,
              this.props.Users,
              this.props.LoginAction,
              this.props.FetchTransactions,
              this.props.FetchGroupsA,
              this.props.FetchUsers,
              this.setModalVisible,
              this.props.GroupClickAction,
              final,
              currentGroup,
              this
            )
          )}
        </ScrollView>
        <Fab onPress={() => navigate("AddGroup")} style={styles.fab}>
          <Text>+</Text>
        </Fab>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View>
            <Animated.View style={{ marginTop: HeaderCardMove }}>
              <Card style={styles.card}>
                <CardItem style={styles.flex} header>
                  <Animated.Text
                    style={[styles.textFont, { opacity: opacity }]}
                  >
                    {"Welcome, " + this.props.CurrentUser.User.Name}
                  </Animated.Text>
                </CardItem>
                <CardItem cardBody>
                  <Body style={styles.flex}>
                    <View style={styles.flex}>
                      <Animated.Text style={{ opacity: opacity }}>
                        Current Status:
                        {isProfit(this.props.CurrentUser.User)}
                      </Animated.Text>
                    </View>
                    <View style={styles.inView}>
                      <Left>
                        <Animated.Text
                          style={[
                            styles.textAnim,
                            {
                              opacity: opacity,
                              color: "red"
                            }
                          ]}
                        >
                          &#x25BC;Rs.{parseInt(
                            this.props.CurrentUser.User.DownAmt
                          )}
                        </Animated.Text>
                      </Left>
                      <Right>
                        <Animated.Text
                          style={[
                            styles.textAnim,
                            {
                              opacity: opacity
                            }
                          ]}
                        >
                          &#x25B2;Rs.{parseInt(
                            this.props.CurrentUser.User.UpAmt
                          )}
                        </Animated.Text>
                      </Right>
                    </View>
                  </Body>
                </CardItem>
                <CardItem footer style={styles.footerCard}>
                  <Text style={styles.stickHeader}>Your Expense Groups</Text>
                </CardItem>
              </Card>
            </Animated.View>
          </View>
        </Animated.View>
        <Animated.Image
          style={{
            position: "absolute",
            width: hw,
            height: hw,
            borderRadius: iRadius,
            top: ImgMoveVert,
            left: ImgMove
          }}
          source={{
            uri:
              "https://api.adorable.io/avatars/200/abott@adorable." +
              this.props.CurrentUser.User.Name
          }}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    CurrentUser: state.currentUser.CurrentUser,
    Users: state.fetchUser.users,
    Groups: state.fetchGroups,
    Transactions: state.FetchTransactionReducer.trans
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchUsers: () => dispatch(FetchUsers()),
    FetchGroupsA: () => dispatch(FetchGroups()),
    FetchTransactions: () => dispatch(FetchTransactions()),
    LoginAction: CurrentUser => dispatch(LoginAction(CurrentUser)),
    GroupClickAction: CurrentGroup => dispatch(GroupClickAction(CurrentGroup))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
