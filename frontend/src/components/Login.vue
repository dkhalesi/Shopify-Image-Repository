<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#96bf48">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="userData.username"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="userData.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text>
                Don't have an account?
                <router-link to="/SignUp">Sign Up!</router-link>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#96bf48" v-on:click="login(userData)"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { handleLogin } from "../scripts/login.js";
export default {
  name: "Login",
  data() {
    return {
      userData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login(userData) {
      const bindedLogin = handleLogin.bind(this);
      bindedLogin(userData);
    },
  },
};
</script>