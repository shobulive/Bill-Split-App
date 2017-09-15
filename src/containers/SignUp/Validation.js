function isValidate(newUser) {
  if (newUser.values === undefined) return false;
  let reName = /^[A-z]+$/;
  let reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reName.test(newUser.values.name)) {
    if (reEmail.test(newUser.values.email)) {
      if (newUser.values.phone.length == 10) {
        if (
          newUser.values.password + "" ===
          newUser.values.confirmpassword + ""
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
export default isValidate;
