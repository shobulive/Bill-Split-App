function getCurrentGroupInfo(final, currentGroup, groups, trans, User) {
  final.length = 0;
  let totalOwe = [],
    totalGet = [];
  if (groups && currentGroup) {
    let fetchedGroups = Object.values(groups);
    let thisGroupTrans = [];
    let Members = currentGroup.value.Members.slice();
    let Transactions = trans ? Object.values(trans) : [];
    for (let i = 0; i < Transactions.length; i++) {
      if (Transactions[i]) {
        if (Transactions[i].GID == currentGroup.key) {
          thisGroupTrans.push(Transactions[i]);
        }
      }
    }
    if (thisGroupTrans.length > 0) {
      for (let i = 0; i < thisGroupTrans.length; i++) {
        let currentMembersWithoutMe = thisGroupTrans[i].Members.slice();
        currentMembersWithoutMe.splice(
          currentMembersWithoutMe.indexOf(User.Phone),
          1
        );
        if (thisGroupTrans[i].PaidBy == User.Phone) {
          let justPushed;
          for (let j = 0; j < currentMembersWithoutMe.length; j++) {
            if (totalGet.length == 0) {
              totalGet.push({
                key: currentMembersWithoutMe[j],
                value:
                  thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
              });
            } else {
              let TotalGetKeys = [];
              for (let i = 0; i < totalGet.length; i++) {
                TotalGetKeys.push(totalGet[i].key);
              }
              let exists = false;
              let x = 0;
              for (x = 0; x < TotalGetKeys.length; x++) {
                if (TotalGetKeys[x] == currentMembersWithoutMe[j]) {
                  exists = true;
                  break;
                }
              }
              if (exists) {
                totalGet[x].value +=
                  thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1);
              } else {
                totalGet.push({
                  key: currentMembersWithoutMe[j],
                  value:
                    thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
                });
              }
            }
          }
        } else {
          if (totalOwe.length == 0) {
            totalOwe.push({
              key: thisGroupTrans[i].PaidBy,
              value:
                thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
            });
          } else {
            let tempL = totalOwe.length;
            for (let m = 0; m < tempL; m++) {
              if (totalOwe[m].key == thisGroupTrans[i].PaidBy) {
                totalOwe[m].value +=
                  thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1);
                break;
              } else {
                totalOwe.push({
                  key: thisGroupTrans[i].PaidBy,
                  value:
                    thisGroupTrans[i].Amt / (currentMembersWithoutMe.length + 1)
                });
                break;
              }
            }
          }
        }
      }
    }

    let commonKeys = [];
    for (let i = 0; i < totalGet.length; i++) {
      for (let j = 0; j < totalOwe.length; j++) {
        if (totalOwe[j].key == totalGet[i].key) {
          final.push({
            key: totalOwe[j].key,
            value: totalGet[i].value - totalOwe[j].value
          });
          commonKeys.push(totalOwe[j].key);
        }
      }
    }
    for (let i = 0; i < totalGet.length; i++) {
      let found = false;
      for (let j = 0; j < commonKeys.length; j++) {
        if (commonKeys[j] == totalGet[i].key) found = true;
      }
      if (!found) {
        final.push({
          key: totalGet[i].key,
          value: totalGet[i].value
        });
      }
    }
    for (let i = 0; i < totalOwe.length; i++) {
      let found = false;
      for (let j = 0; j < commonKeys.length; j++) {
        if (commonKeys[j] == totalOwe[i].key) found = true;
      }
      if (!found) {
        final.push({
          key: totalOwe[i].key,
          value: -totalOwe[i].value
        });
      }
    }
  }
  return final;
}
export default getCurrentGroupInfo;
