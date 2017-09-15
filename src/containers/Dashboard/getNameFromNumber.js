function getNameFromNumber(Number, Users) {
  for (let i in Users) {
    if (Users[i].Phone === Number) return Users[i].Name;
  }
}
export default getNameFromNumber;
