<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#96bf48">
                <v-toolbar-title>Sign Up</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="name"
                    label="Name"
                    type="text"
                    v-model="userData.name"
                  ></v-text-field>
                  <v-text-field
                    name="username"
                    label="Username"
                    type="text"
                    v-model="userData.username"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    type="password"
                    v-model="userData.password"
                  ></v-text-field>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    v-model="userData.confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text>
                Already have an account?
                <router-link to="/">Log in!</router-link>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#96bf48" v-on:click="signUp(userData)"
                  >Sign Up</v-btn
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
import { handleSignUp } from "../scripts/signUp.js";
export default {
  name: "SignUp",
  data() {
    return {
      userData: {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    signUp(userData) {
      const bindedSignUp = handleSignUp.bind(this);
      bindedSignUp(userData);
    },
  },
};
</script>