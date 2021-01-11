<template>
  <div>
    <h2>Sign Up</h2>
    <form>
      <input
        type="text"
        name="name"
        v-model="userData.name"
        placeholder="Name"
      /><br />
      <input
        type="text"
        name="username"
        v-model="userData.username"
        placeholder="Username"
      /><br />
      <input
        type="password"
        name="password"
        v-model="userData.password"
        placeholder="Password"
      /><br />
      <input
        type="password"
        name="confirmPassword"
        v-model="userData.confirmPassword"
        placeholder="Confirm Password"
      /><br />
      <button type="button" v-on:click="signUp(userData)">Sign Up</button>
    </form>
    <nav>
      Already have an account?
      <router-link to="/">Log in!</router-link>
    </nav>
  </div>
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