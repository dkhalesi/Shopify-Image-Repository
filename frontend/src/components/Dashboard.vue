<template>
  <v-app id="dashboard">
    <v-app-bar app dark color="#96bf48">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ nameOfUser }}'s Images</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { handleLogout } from "../scripts/dashboard.js";
export default {
  name: "Dashboard",
  props: {
    nameOfUser: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  methods: {
    logout() {
      const bindedLogout = handleLogout.bind(this);
      bindedLogout();
    },
  },
  mounted() {
    // check if user is authenticated before allowing access to dashboard
    console.log("we are here", this.nameOfUser);
    if (this.nameOfUser === "") {
      this.$router.push("/");
    }
  },
};
</script>