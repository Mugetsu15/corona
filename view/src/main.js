import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueApexCharts)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
