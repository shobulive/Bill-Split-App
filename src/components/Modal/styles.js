import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  MainModal: {
    height: "50%",
    marginTop: "106%"
  },
  view1: {
    backgroundColor: "white",
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    flex: 1
  },
  view2: {
    flexDirection: "row",
    backgroundColor: "#D12030",
    borderRadius: 15,
    flex: 1
  },
  modalText: {
    alignSelf: "center",
    color: "white",
    marginLeft: 10
  },
  mainContent: {
    flex: 5
  },
  close: { color: "white" }
});
export default styles;
