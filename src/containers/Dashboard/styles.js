import Expo from "expo";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#D12030"
  },
  flex: {
    flex: 1
  },
  fill: {
    flex: 1,
    marginTop: Expo.Constants.statusBarHeight,
    backgroundColor: "white"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden"
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18,
    marginTop: "-10%"
  },
  stickHeader: {
    color: "#fff",
    alignSelf: "flex-start",
    marginTop: 20
  },
  footerCard: {
    backgroundColor: "#D12030",
    flex: 1,
    flexDirection: "column"
  },
  textAnim: {
    color: "green",
    fontSize: 22,
    padding: "2.5%",
    paddingBottom: "2.5%"
  },
  card: {
    flex: 1,
    width: "100%",
    position: "absolute",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  },
  inView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  textFont: {
    fontSize: 26,
    marginLeft: "-5%"
  }
});
export default styles;
