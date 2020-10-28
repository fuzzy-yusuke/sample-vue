import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false




  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD4ou1ptqJOJnurGgHzJjtEFxzXTqqWT3A",
    authDomain: "my-address-pj-634f3.firebaseapp.com",
    databaseURL: "https://my-address-pj-634f3.firebaseio.com",
    projectId: "my-address-pj-634f3",
    storageBucket: "my-address-pj-634f3.appspot.com",
    messagingSenderId: "494726969142",
    appId: "1:494726969142:web:cfdef3696558330a7e2597",
    measurementId: "G-54S6BYCYNT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


new Vue({
  //routerオプションにrouter変数を渡している
  router,

  store,
  vuetify,

  //h関数：createElement関数の別名
  render: h => h(App)
}).$mount('#app')
