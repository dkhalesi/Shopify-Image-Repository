<template>
  <div>
    <h2>Login</h2>
    <form>
      <input
        type="text"
        name="username"
        id="username"
        v-model="userData.username"
        placeholder="Username"
      /><br />
      <input
        type="password"
        name="password"
        id="password"
        v-model="userData.password"
        placeholder="Password"
      /><br />
      <button type="button" v-on:click="login(userData)">Login</button>
    </form>
    <nav>
      Don't have an account?
      <router-link to="/SignUp">Sign Up!</router-link>
    </nav>
  </div>
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