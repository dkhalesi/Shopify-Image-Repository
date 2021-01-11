<template>
  <div>
    <h2>Dashboard</h2>
    <p>Name: {{ user.name }}</p>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      user: {
        name: "",
      },
    };
  },
  methods: {
    getUserData: function () {
      console.log("made it");
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>