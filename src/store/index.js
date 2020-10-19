import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false //デフォルトは閉じた状態
  },
  mutations: { //stateの状態を変更する
    toggleSideMenu(state){
      state.drawer=!state.drawer
    }
  },
  actions: {
    toggleSideMenu({commit}) { //引数としてcontextオブジェクトが自動的に渡される
      commit('toggleSideMenu')
    }
  },
  modules: {
  }
})
