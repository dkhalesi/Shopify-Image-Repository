const axios = require('axios');
const FormData = require('form-data');

function handleViewAll() {
    this.charArr = [];
    this.viewAllBool = true;
    this.$forceUpdate();
    console.log(this.charArr, this.viewAllBool)
}

function handleSearch() {
    this.searchDialog = false;
    if (this.characteristic == "") {
        alert("Search field is empty.");
        return;
    }
    const url = "https://dina-search-photo.nn.r.appspot.com/search";

    axios.post(url, { username: this.username, characteristic: this.characteristic })
        .then((response) => {
            if (response.data && response.data.length > 0) {
                this.charArr = response.data;
                this.viewAllBool = false;
                this.$forceUpdate();
            } else {
                alert("No images with that characteristic exists.")
            }
        })
        .catch((error) => {
            alert("Oups... Error on our end. Unable to upload picture")
            console.log(error);
        });
}

function handleLogout() {
    this.$emit("send-auth", { username: "", name: "", images: [] })
    this.$router.push("/");
}

async function handleUpload() {
    if (this.currentFile == null) {
        alert("Select file before uploading please.");
        return;
    }
    const url = "https://dina-search-photo.nn.r.appspot.com/upload";


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

export { handleLogout, handleUpload, handleSearch, handleViewAll }