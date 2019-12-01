import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import VueResource from 'vue-resource'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueResource)
Vue.use(VueQrcodeReader)

Vue.http.options.root = 'http://192.168.15.13:9000/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
