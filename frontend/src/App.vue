<template>
  <div id="app">
    <UserContext />
  </div>
</template>

<script>
import UserContext from "./components/UserContext.vue";
export default {
  name: "App",
  components: { UserContext },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
