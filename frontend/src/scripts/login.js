const axios = require('axios');

async function handleLogin(userData) {
    if (!formComplete(userData)) {
        alert("Make sure all text fields are completed!");
        return;
    }

    // const url = "https://dina-search-photo.nn.r.appspot.com/login";
    const url = "http://localhost:3000/login";

    axios.post(url, userData)
        .then((response) => {
            if (response.data) {
                this.$emit("send-auth", response.data)
                this.$router.push("Dashboard");
                //function to populate
            } else {
                alert("Wrong username or password. Please try again.")
            }
        })
        .catch((error) => {
            alert("Oups... Error on our end. Unable to login.")
            console.error(error);
        });
}

function formComplete(userData) {
    return userData.username !== "" && userData.password !== "";
}

export { handleLogin }