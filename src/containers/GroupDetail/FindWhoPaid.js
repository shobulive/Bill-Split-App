function findWhoPaid(PaidBy, Users) {
  for (let i in Users) {
    if (Users[i].Phone === PaidBy) return Users[i].Name;
  }
}
export default findWhoPaid;
