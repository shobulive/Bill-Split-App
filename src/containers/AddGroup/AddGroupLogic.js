import API from "../../services/FirebaseAPI";
async function AddGroupLogic(
  mythis,
  onLoading,
  MembersInvoled,
  FetchGroups,
  NavigationActions,
  dispatch,
  User,
  name,
  description,
  creationDate,
  lastUpdate,
  createdBy
) {
  let newMembersArr = [];
  newMembersArr.push(User.Phone);
  for (let i = 0; i < MembersInvoled.length; i++) {
    if (MembersInvoled[i] && !newMembersArr.includes(MembersInvoled[i])) {
      newMembersArr.push(parseInt(MembersInvoled[i]));
    } else if (!MembersInvoled[i] || MembersInvoled[i].length != 10) {
      MembersInvoled.splice(i, 1);
      i = 0;
    }
  }
  if (name !== "" && description !== "" && newMembersArr.length > 1) {
    onLoading(mythis, true);
    let newGroup = {
      Name: name,
      CreateTime: creationDate,
      LastUpdateTime: lastUpdate,
      Members: Object.assign({}, newMembersArr),
      Description: description,
      CreatedBy: createdBy
    };
    await new API().AddGroup(newGroup);
    FetchGroups();
    setTimeout(() => {
      dispatch(NavigationActions.back());
    }, 3000);
  }
}
export default AddGroupLogic;
