function SelectAttendees(mythis, item, MembersInvoled, onChangeState) {
  MembersInvoled.indexOf(item) == -1
    ? MembersInvoled.push(item) && onChangeState(item, mythis)
    : MembersInvoled.splice(MembersInvoled.indexOf(item), 1) &&
      onChangeState(1, mythis);
}
export default SelectAttendees;
