import API from "../../services/FirebaseAPI";
async function DeleteButtonPress(
  item,
  Transactions,
  Users,
  LoginAction,
  fetchTransaction,
  fetchGroups,
  fetchUsers,
  User
) {
  await new API().RemoveGroupByID(item.key);
  if (Transactions) {
    let fetchedTransactions = Object.values(Transactions);
    let fetchedTransactionsKeys = Object.keys(Transactions);
    for (let i = 0; i < fetchedTransactions.length; i++) {
      if (fetchedTransactions[i])
        if (fetchedTransactions[i].GID == item.key) {
          await new API().RemoveTransactionById(fetchedTransactionsKeys[i]);
        }
    }
    let thisGroupTrans = [];
    for (let i = 0; i < fetchedTransactions.length; i++) {
      if (fetchedTransactions[i]) {
        if (fetchedTransactions[i].GID == item.key) {
          thisGroupTrans.push(fetchedTransactions[i]);
        }
      }
    }
    let users = Object.values(Users);
    let userskeys = Object.keys(Users);
    let toBechangedUserKeys = [];
    for (let i = 0; i < item.value.Members.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (users[j])
          if (users[j].Phone == item.value.Members[i]) {
            toBechangedUserKeys.push(userskeys[j]);
          }
      }
    }
    for (let i = 0; i < toBechangedUserKeys.length; i++) {
      for (let j = 0; j < userskeys.length; j++) {
        if (userskeys[j]) {
          if (userskeys[j] == toBechangedUserKeys[i]) {
            for (let k = 0; k < thisGroupTrans.length; k++) {
              if (users[j].Phone == thisGroupTrans[k].PaidBy) {
                users[j].UpAmt = parseInt(users[j].UpAmt);
                users[j].UpAmt -=
                  thisGroupTrans[k].Amt /
                  thisGroupTrans[k].Members.length *
                  (thisGroupTrans[k].Members.length - 1);
                users[j].UpAmt = users[j].UpAmt.toFixed(1);
              } else {
                users[j].DownAmt = parseInt(users[j].DownAmt);
                users[j].DownAmt -=
                  thisGroupTrans[k].Amt / thisGroupTrans[k].Members.length;
                users[j].DownAmt = users[j].DownAmt.toFixed(1);
              }
              await new API().UpdateUserByObjectAndKey(userskeys[j], users[j]);
            }
          }
        }
      }
    }
    let CurrentUserKey;
    for (let z = 0; z < users.length; z++) {
      if (users[z].Phone == User.Phone) {
        CurrentUserKey = userskeys[z];
      }
    }
    LoginAction(users[userskeys.indexOf(CurrentUserKey)]);
  }
  debugger;
  fetchTransaction();
  fetchGroups();
  fetchUsers();
}
export default DeleteButtonPress;
