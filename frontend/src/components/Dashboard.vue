<template>
  <v-app id="dashboard">
    <v-app-bar app shrink-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ nameOfUser }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
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
  mounted() {
    // check if user is authenticated before allowing access to dashboard
    if (this.nameOfUser === "") {
      this.$router.push("/");
    }
  },
};
</script>