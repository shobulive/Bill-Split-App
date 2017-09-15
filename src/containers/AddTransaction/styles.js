import Expo from "expo";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Expo.Constants.statusBarHeight
  },
  scrollView: { flex: 1, backgroundColor: "white" },
  formS: { flex: 6 },
  spinner: { width: 50, height: 30 }
});
export default styles;
