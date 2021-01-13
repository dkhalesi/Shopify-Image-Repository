import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

const store = {
  debug: true,
  state: {
    isAuth: false
  },
  setAuth(newValue) {
    if (this.debug) console.log('setAuth triggered with', newValue)
    this.state.isAuth = newValue
  }
}

new Vue({
  data: {
    sharedState: store.state
  },
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')

export default store
