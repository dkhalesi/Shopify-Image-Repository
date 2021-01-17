const axios = require('axios');
const FormData = require('form-data');

function handleLogout() {
    this.$emit("send-auth", { name: "", images: [] })
    this.$router.push("/");
}

async function handleUpload() {
    if (this.currentFile == null) {
        alert("Select file before uploading please.");
        return;
    }
    const url = "http://localhost:3000/upload";


    let formData = new FormData();
    formData.append('username', this.username);
    formData.append('image', this.currentFile);

    axios.post(url, formData, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        }
    })
        .then((response) => {
            if (response.data) {
                this.$emit("send-auth", { username: this.username, name: this.nameOfUser, images: response.data })
                this.reversedImages = this.images.slice().reverse()
                this.$forceUpdate();
            } else {
                alert("Please try again.")
            }
        })
        .catch((error) => {
            alert("Oups... Error on our end. Unable to upload picture")
            console.log(error);
        });
}

export { handleLogout, handleUpload }