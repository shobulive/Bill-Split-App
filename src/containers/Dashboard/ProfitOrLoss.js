function totalProfitOrLoss(final) {
  let sum = 0;
  for (let i = 0; i < final.length; i++) {
    sum += final[i].value;
  }
  if (sum > 0) return true;
  else return false;
}
export default totalProfitOrLoss;
