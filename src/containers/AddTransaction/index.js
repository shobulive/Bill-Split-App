import React, { Component } from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import { Image, View, ScrollView } from "react-native";
import {
  Container,
  Button,
  Icon,
  Text,
  Footer,
  Form,
  Item,
  Input,
  Label,
  Fab,
  Spinner,
  Body,
  Right,
  ListItem,
  List
} from "native-base";
import { connect } from "react-redux";
import Header from "../../components/Header";
import FetchUsers from "../../store/Users/action";
import FetchTransactions from "../../store/Transactions/action";
import handleSubmit from "./handleSubmit";
import SelectAttendees from "./SelectAttendees";
import SelectPayer from "./SelectPayer";
import renderChooseMembers from "./RenderChooseMembers";
import renderChoosePayer from "./RenderChoosePayer";
import getNameFromNumber from "./getNameFromNumber";
import styles from "./styles";
let MembersInvoled = [];
let AllMember = [];
let payer;
class AddTransaction extends React.PureComponent {
  static navigationOptions = {
    title: "AddTransaction",
    header: null
  };
  constructor(props) {
    super(props);
    MembersInvoled = [];
    payer = 0;
    AllMember = [];
    this.state = { isSelected: 0, payer: 0, isSubmitting: false };
    this.For;
    this.Amt;
  }
  onChangeState(isSelected, mythis) {
    mythis.setState({ isSelected: isSelected });
  }
  setPayer(item) {
    payer = item;
  }
  onChangePayerState(payer, mythis) {
    mythis.setState({ payer: payer });
  }
  isSubmitting(mythis, isSubmitting) {
    mythis.setState({ isSubmitting: isSubmitting });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container padder style={styles.fill}>
        <Header
          visibility="hidden"
          title="Add Transaction"
          imageUri="../img/GroupIcon.png"
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back());
          }}
        />
        <ScrollView style={styles.scrollView}>
          <Form style={styles.formS}>
            <Item floatingLabel>
              <Icon active name="chatboxes" />
              <Input
                onChange={event => {
                  this.For = event.nativeEvent.text;
                }}
                placeholder="For"
              />
            </Item>
            <Item floatingLabel>
              <Icon active name="chatboxes" />
              <Input
                onChange={event => {
                  this.Amt = event.nativeEvent.text;
                }}
                keyboardType="numeric"
                placeholder="Amt"
              />
            </Item>
            <Label>Who Attended The Event?</Label>
            {renderChooseMembers(
              this.props.Groups,
              this.props.CurrentGroup,
              AllMember,
              MembersInvoled,
              this.props.CurrentUser.User,
              this.props.Users,
              this,
              this.onChangeState
            )}
            <Label>Who Paid?</Label>
            {renderChoosePayer(
              AllMember,
              this.props.Users,
              this.props.CurrentUser.User,
              this.onChangePayerState,
              this.setPayer,
              this
            )}
          </Form>
        </ScrollView>
        <Button
          full
          danger
          onPress={handleSubmit.bind(
            this,
            MembersInvoled,
            this.props.CurrentUser.User,
            payer,
            this.isSubmitting,
            this.For,
            this.Amt,
            this.props.CurrentGroup,
            this.props.Users,
            this.props.FetchTransactions,
            this.props.FetchUsers,
            this.props.navigation.dispatch,
            NavigationActions,
            this
          )}
        >
          {this.state.isSubmitting ? (
            <Spinner color="white" style={styles.spinner} />
          ) : (
            <Text>Submit</Text>
          )}
        </Button>
        <Footer
          style={{
            display: this.state.isSelected || this.state.payer ? "flex" : "none"
          }}
        >
          <Body>
            <Text>Involved</Text>
            <List
              dataArray={MembersInvoled}
              renderRow={item => (
                <ListItem>
                  <Text>{getNameFromNumber(item, this.props.Users)}</Text>
                </ListItem>
              )}
            />
          </Body>
          <Right>
            <Text>PaidBy</Text>
            <Text>
              {payer == this.props.CurrentUser.User.Phone ? (
                "You"
              ) : (
                getNameFromNumber(payer, this.props.Users)
              )}
            </Text>
          </Right>
        </Footer>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    CurrentUser: state.currentUser.CurrentUser,
    Users: state.fetchUser.users,
    CurrentGroup: state.GroupClickReducer.CurrentGroup,
    Groups: state.fetchGroups
  };
}
function mapDispatchToProps(dispatch) {
  return {
    FetchUsers: () => dispatch(FetchUsers()),
    FetchTransactions: () => dispatch(FetchTransactions())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
