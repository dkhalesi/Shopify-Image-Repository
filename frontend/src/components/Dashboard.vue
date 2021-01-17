<template>
  <v-app id="dashboard">
    <v-app-bar app dark color="#96bf48">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ nameOfUser }}'s Images</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-file-input
        label="File input"
        filled
        multiple
        prepend-icon="mdi-camera"
        @change="selectPicture"
      ></v-file-input>
      <v-btn icon v-on:click="uploadPicture()">
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
      <v-btn icon v-on:click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container v-if="reversedImages.length > 0">
        <v-row>
          <v-col
            v-for="(image, n) in reversedImages"
            :key="n"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img
              :src="reversedImages[n]"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else> Upload! </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { handleLogout, handleUpload } from "../scripts/dashboard.js";
export default {
  name: "Dashboard",
  props: {
    username: {
      type: String,
    },
    nameOfUser: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  data() {
    return {
      currentFile: null,
      reversedImages: this.images.slice().reverse(),
    };
  },
  methods: {
    logout() {
      const bindedLogout = handleLogout.bind(this);
      bindedLogout();
    },
    selectPicture(event) {
      this.currentFile = event[0];
    },
    uploadPicture() {
      const bindedUpload = handleUpload.bind(this);
      bindedUpload();
    },
  },
  watch: {
    images: function (newVal) {
      this.reversedImages = newVal.slice().reverse();
      this.$forceUpdate();
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