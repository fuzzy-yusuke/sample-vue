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
    addAddress(state,{id,address}){
      address.id=id //idで各連絡先を識別
      state.addresses.push(address)
    },
    updateAddress(state,{id,address}){
      const index=state.addresses.findIndex(address => address.id === id) //findindexメソッドで対象のアドレスオブジェクトが存在しているかをチェック
      state.addresses[index]=address                                      //新しいアドレスオブジェクトを代入することで更新
    },
    deleteAddress(state,{id}){
      const index=state.addresses.findIndex(address => address.id === id)
      state.addresses.splice(index,1) //splice関数でindex番号と要素数を指定
    }
  },
  actions: {
    setLoginUser({commit},user){
      commit('setLoginUser',user)
    },
    fetchAddresses({ getters,commit }){ //Firestoreからデータを取得
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => { //collectionで取得対象のパスを指定し、thenメソッドに渡した関数の引数でgetの結果を受け取る
        snapshot.forEach(doc => commit('addAddress',{id:doc.id, address: doc.data() }))           //snapshotで一つ一つの連絡先が格納(配列っぽいが、配列ではない。)
      })
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
    addAddress({getters,commit},address){
      if (getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc => { 
          //gettersからIDを取得出来たら、FirestormのcollectionメソッドでDB上のパスを指定し、addメソッドで連絡先のオブジェクトを追加
          commit('addAddress',{id:doc.id, address}) 
        })
      }
    },
    updateAddresses({getters,commit},{id,address}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => { //docメソッドにIDを渡して更新対象を取得
          commit('updateAddress',{id,address})
        })
      }
    },
    deleteAddress({getters,commit},{id}){ //IDに該当する連絡先を呼び出して削除
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress',{id}) //完了後、引数のコールバック関数が呼ばれてミューテーションが実行
      })
    }
  }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',  //ログインユーザーの名前とアイコンの画像を取得するオブジェクト
    photoURL: state => state.login_user ? state.login_user.photoURL : '',      //stateからデータを取得し、加工されたデータを返す関数(login_userがnullの時は空文字で返す)
    uid:      state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id) //関数を返す関数でidを引数に受け取り、storeのアドレスを呼び出すidを指定する
  }
})
