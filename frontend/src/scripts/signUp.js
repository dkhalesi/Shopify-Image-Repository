const axios = require('axios');

async function handleSignUp(userData) {
    if (!formComplete(userData)) {
        alert("Make sure all text fields are completed!");
        return;
    }
    //check if passwords match
    if (userData.password !== userData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const url = "https://dina-search-photo.nn.r.appspot.com/signUp";

    axios.post(url, userData)
        .then((response) => {
            if (response.data) {
                this.$emit("send-auth", { username: userData.username, name: userData.name, images: [] })
                this.$router.push("Dashboard");
            } else {
                alert("Username seems to be taken. Please try a new username." + userData.username)
            }
        })
        .catch((error) => {
            alert("Oups... Error on our end. Unable to submit form.")
            console.error(error);
        });
}

function formComplete(userData) {
    return userData.name !== "" && userData.username !== "" &&
        userData.password !== "" && userData.confirmPassword !== "";
}

export { handleSignUp }