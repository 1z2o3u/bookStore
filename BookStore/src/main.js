// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import '../static/css/reset.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.prototype.$axios=axios
Vue.config.productionTip = false

Vue.use(Croppa)
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
