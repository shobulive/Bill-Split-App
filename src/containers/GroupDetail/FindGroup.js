function findGroup(Groups, CurrentGroup) {
  if (Groups) {
    for (let i in Object.keys(Groups)) {
      if (Object.keys(Groups)[i] == CurrentGroup) {
        return Groups[Object.keys(Groups)[i]];
      }
    }
  }
}
export default findGroup;
