import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  //routerオプションにrouter変数を渡している
  router,

  store,
  vuetify,

  //h関数：createElement関数の別名
  render: h => h(App)
}).$mount('#app')
