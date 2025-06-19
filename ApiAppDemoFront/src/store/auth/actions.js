export default {
    Login(context, payload){
        context.commit("setAuth", {isAuth: true, userLogin: payload.userLogin});
    },
    Logout(context){
        localStorage.removeItem('token');

        context.commit("setAuth", {isAuth: false, userLogin: ''});
    },
    async TryLogin(context) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const url = "https://localhost:7221/";
        const response = await fetch(url + 'Auth/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) 
            throw new Error(`status: ${response.status}`);

        const data = await response.json();
        context.dispatch("Login", { userLogin: data.email });
    } catch (err) {
        console.log('Auto login failed:', err);
    }
}
}