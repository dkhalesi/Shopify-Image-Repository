import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import SignUp from "@/components/SignUp"
import Dashboard from "@/components/Dashboard"
import store from "../main.js"

Vue.use(Router)

const router = new Router({
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
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  console.log("running")
  if (to.matched.some(record => record.meta.requiresAuth) && (!store || !store.state.isAuth)) {
    // go back to original route (login or sign up page)
    next({
      path: '/'
    })
  } else {
    // proceed with accessing the secured page (user dashboard)
    next();
  }

  //TO-DO: put isAuth to false if url is sign in or login
})

export default router