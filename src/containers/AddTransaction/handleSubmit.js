import API from "../../services/FirebaseAPI";
async function handleSubmit(
  MembersInvoled,
  User,
  payer,
  isSubmitting,
  For,
  Amt,
  currGID,
  Users,
  fetchTransaction,
  fetchUsers,
  dispatch,
  NavigationActions,
  mythis
) {
  if (MembersInvoled.length != 0 && For != "" && Amt != "" && payer != "") {
    if (MembersInvoled.indexOf(User.Phone) == -1) {
      MembersInvoled.push(User.Phone);
    }
    if (MembersInvoled.indexOf(payer) == -1) {
      MembersInvoled.push(payer);
    }
    isSubmitting(mythis, true);
    let Transaction = {
      For: For,
      Amt: parseInt(Amt),
      GID: currGID,
      Members: MembersInvoled,
      PaidBy: payer,
      DateTime: new Date()
        .toString()
        .split(" ")
        .splice(1, 4)
        .join(" ")
    };
    await new API().UpdateGroupsByObjectAndKey(Transaction.GID, {
      LastUpdateTime: Transaction.DateTime
    });
    let users = Object.values(Users);
    let userskeys = Object.keys(Users);
    await new API().AddTransaction(Transaction);
    for (let i = 0; i < MembersInvoled.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (MembersInvoled[i] == users[j].Phone) {
          if (payer == users[j].Phone) {
            users[j].UpAmt = parseInt(users[j].UpAmt);
            users[j].UpAmt +=
              Amt / MembersInvoled.length * (MembersInvoled.length - 1);

            users[j].UpAmt = users[j].UpAmt.toFixed(1);
          } else {
            users[j].DownAmt = parseInt(users[j].DownAmt);
            users[j].DownAmt += this.Amt / MembersInvoled.length;
            users[j].DownAmt = users[j].DownAmt.toFixed(1);
          }
          await new API().UpdateUserByObjectAndKey(userskeys[j], users[j]);
        }
      }
    }
  }
  fetchTransaction();
  fetchUsers();
  await setTimeout(() => {
    isSubmitting(mythis, false);
    dispatch(NavigationActions.back());
  }, 3000);
}
export default handleSubmit;
