function SelectPayer(mythis, item, onChangePayerState, setPayer) {
  setPayer(item);
  onChangePayerState(item, mythis);
}
export default SelectPayer;
