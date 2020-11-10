<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
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
      }else{
        this.deleteLoginUser()                   
      }
    })
  },
  data (){
    return{
      //
    }
  },
  methods: {
    ...mapActions(['toggleSideMenu','setLoginUser','logout','deleteLoginUser']) //オブジェクト内に含まれるアクションをそれぞれのメソッド内に展開される
  }
};
</script>
