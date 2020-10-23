<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>

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
export default {
  name: 'App',
  components: {
    SideNav
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['toggleSideMenu']) //オブジェクト内に含まれるアクションをそれぞれのメソッド内に展開される
  }
};
</script>
