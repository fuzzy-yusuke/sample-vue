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
    deleteLoginUser(state){ //ログアウト時にユーザー情報を削除
      state.login_user=null
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
    logout(){
      firebase.auth().signOut()
    },
    deleteLoginUser({commit}){
      commit('deleteLoginUser')
    },
    toggleSideMenu({commit}) { //引数としてcontextオブジェクトが自動的に渡される
      commit('toggleSideMenu')
    },
    addAddress({commit},address){
      commit('addAddress',address)
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',  //ログインユーザーの名前とアイコンの画像を取得するオブジェクト
    photoURL: state => state.login_user ? state.login_user.photoURL : ''      //stateからデータを取得し、加工されたデータを返す関数(login_userがnullの時は空文字で返す)
  }
})
