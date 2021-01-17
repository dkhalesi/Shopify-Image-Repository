<template>
  <div>
    <router-view
      @send-auth="handleAuth"
      :username="username"
      :nameOfUser="nameOfUser"
      :images="imagesOfUser"
    />
  </div>
</template>

<script>
export default {
  name: "UserContext",
  data() {
    return {
      username: "",
      nameOfUser: "",
      imagesOfUser: [],
    };
  },
  methods: {
    handleAuth: function (value) {
      this.username = value.username;
      this.nameOfUser = value.name;
      this.imagesOfUser = value.images;
    },
  },
};
</script>