import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import SignUp from "@/components/SignUp"
import Dashboard from "@/components/Dashboard"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard
    }
  ]
})