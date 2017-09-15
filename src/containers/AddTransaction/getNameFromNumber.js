function getNameFromNumber(Number, Users) {
  let arrUsers = Object.values(Users);
  for (let i = 0; i < arrUsers.length; i++) {
    if (arrUsers[i].Phone == Number) {
      return arrUsers[i].Name;
    }
  }
}
export default getNameFromNumber;
