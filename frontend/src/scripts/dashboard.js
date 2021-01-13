function handleLogout() {
    this.$emit("send-auth", { name: "", images: [] })
    this.$router.push("/");
}

export { handleLogout }