import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false, //デフォルトは閉じた状態
    addresses:[]
  },
  mutations: { //stateの状態を変更する
    setLoginUser (state,user){
      state.login_user=user
    },
    toggleSideMenu(state){
      state.drawer=!state.drawer
    },
    addAddress(state,address){
      state.addresses.push(address)
    }
  },
  actions: {
    setLoginUser({commit},user){
      commit('setLoginUser',user)
    },
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider() //firebaseのオブジェクトからGoogleのプロバイダーのインスタンスを生成し、変数に格納。
      firebase.auth().signInWithRedirect(google_auth_provider)            //signInWithRedirectのメソッドが呼ばれた時、Googleの認証画面にリダイレクトされる。
    },
    toggleSideMenu({commit}) { //引数としてcontextオブジェクトが自動的に渡される
      commit('toggleSideMenu')
    },
    addAddress({commit},address){
      commit('addAddress',address)
    }
  },
  modules: {
  }
})
