import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,  //routerオプションにrouter変数を渡している
  store,
  render: h => h(App) //h関数：createElement関数の別名
}).$mount('#app')
