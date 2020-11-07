import Vue from 'vue'
import Vuex from 'vuex',
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false, //デフォルトは閉じた状態
    addresses:[]
  },
  mutations: { //stateの状態を変更する
    toggleSideMenu(state){
      state.drawer=!state.drawer
    },
    addAddress(state,address){
      state.addresses.push(address)
    }
  },
  actions: {
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
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
