import Expo from "expo";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#D12030"
  },
  spinner: { width: 50, height: 30 },
  fill: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Expo.Constants.statusBarHeight
  },
  contentS: { backgroundColor: "white" }
});

export default styles;
