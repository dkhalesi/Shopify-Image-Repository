<template>
  <div>
    <router-view
      @send-auth="handleAuth"
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
      nameOfUser: "",
      imagesOfUser: [],
    };
  },
  methods: {
    handleAuth: function (value) {
      this.nameOfUser = value.name;
      this.imagesOfUser = value.images;
    },
  },
};
</script>