import store from "../main.js"

const axios = require('axios');

async function handleLogin(userData) {
    if (!formComplete(userData)) {
        alert("Make sure all text fields are completed!");
        return;
    }

    const url = "http://localhost:3000/login";

    axios.post(url, userData)
        .then((response) => {
            if (response.data) {
                store.state.isAuth = true;
                this.$emit("send-auth", response.data)
                this.$router.push("Dashboard");
                //function to populate
            } else {
                store.state.isAuth = false;
                alert("Wrong username or password. Please try again.")
            }
        })
        .catch((error) => {
            alert("Oups... Error on our end. Unable to login.")
            console.log(error);
        });
}

function formComplete(userData) {
    return userData.username !== "" && userData.password !== "";
}

export { handleLogin }