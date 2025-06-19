export default {
    setAuth(state, payload){
        state.userIsLoggedIn = payload.isAuth;
        state.userLogin = payload.userLogin ?? "";
    }
}