<template>
  <v-app id="dashboard">
    <v-app-bar app dark color="#96bf48">
      <v-toolbar-title>{{ nameOfUser }}'s Images</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog v-model="uploadDialog" max-width="500px">
      <v-card>
        <v-card-title> Select One Picture </v-card-title>
        <v-card-text>
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
          <v-card-text> Click to upload! </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="uploadDialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="searchDialog" max-width="500px">
      <v-card>
        <v-card-title> Search Characteristics: </v-card-title>
        <v-card-text>
          <v-toolbar>
            <v-text-field
              hide-details
              prepend-icon="mdi-magnify"
              single-line
              v-model="characteristic"
            ></v-text-field>
          </v-toolbar>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="searchDialog = false"> Close </v-btn>
          <v-btn text @click="viewAll()"> View all </v-btn>
          <v-btn text @click="confirmSearch()"> Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <v-btn
        color="#96bf48"
        class="ma-2 white--text"
        fab
        @click="uploadDialog = true"
      >
        <v-icon dark> mdi-cloud-upload </v-icon>
      </v-btn>
      <v-btn
        color="#96bf48"
        class="ma-2 white--text"
        fab
        @click="searchDialog = true"
      >
        <v-icon dark> mdi-magnify </v-icon>
      </v-btn>
      <v-container>
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
    </v-main>
  </v-app>
</template>
<script>
import {
  handleLogout,
  handleUpload,
  handleSearch,
  handleViewAll,
} from "../scripts/dashboard.js";
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
      uploadDialog: false,
      searchDialog: false,
      characteristic: "",
      charArr: [],
      viewAllBool: true,
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
    confirmSearch() {
      const bindedSearch = handleSearch.bind(this);
      bindedSearch();
    },
    viewAll() {
      const bindedViewAll = handleViewAll.bind(this);
      bindedViewAll();
    },
  },
  watch: {
    images: function (newVal) {
      this.reversedImages = newVal.slice().reverse();
      this.$forceUpdate();
    },
    viewAllBool: function (newVal) {
      newVal === true
        ? (this.reversedImages = this.images.slice().reverse())
        : (this.reversedImages = this.charArr.slice().reverse());

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