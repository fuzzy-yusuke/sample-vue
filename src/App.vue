<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <!--ログイン中のみサイドメニューのアイコンが表示される-->
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>
      <v-toolbar-items v-if="$store.state.login_user"><!--ログイン中のみログアウトボタンが表示される-->
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      
    </v-app-bar>

    <SideNav/>
    
    <v-content>
      <v-container fluid fill-height align-start>
        <router-view/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import SideNav from './components/SideNav' //SideNav.vueをインポートし、ローカル登録を行う
import {mapActions}from 'vuex'             //コンポーネントのメソッドにstoreのactionメソッドを組み込む
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    SideNav
  },
  created (){
    firebase.auth().onAuthStateChanged(user => {  //呼び出されるコールバック関数はログインの時はユーザーのオブジェクト、ログアウトの時はnullをそれぞれ受け取る
      if(user){                                   //非同期で実行される為、ログインとログアウトどちらの時もonAuthStateChangedを経由する
        this.setLoginUser(user)
        this.fetchAddresses()
        if(this.$router.currentRoute.name === 'home'){  //ログインし且つ、現在いる場所がホーム画面だった時、連絡先一覧が表示される。
          this.$router.push({name: 'addresses'}, () => {}) 
        }
      }else{
        this.deleteLoginUser()
        this.$router.push({name: 'home'}, () => {})      //pushメソッドでホーム画面に移動する             
      }
    })
  },
  data (){
    return{
      //
    }
  },
  methods: {
    ...mapActions(['toggleSideMenu','setLoginUser','logout','deleteLoginUser','fetchAddresses']) //オブジェクト内に含まれるアクションをそれぞれのメソッド内に展開される
  }
};
</script>
