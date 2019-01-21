export default {
  getLoginUserName(state) {
    return state.LoginUser ? state.LoginUser : "not login";
  }
};
