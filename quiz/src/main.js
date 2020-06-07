import Vue from 'vue'
// per installare il pacchetto bootsrap-vue digitare sul cmd "npm install bootsrap-vue bootstrap"
import BootstrapVue from 'bootstrap-vue'
// importo i css di bootsrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
