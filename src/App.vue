<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>マイアドレス帳</v-toolbar-title>

      <v-spacer></v-spacer>

      
    </v-app-bar>
    <v-content>
      <SideNav/>
    </v-content>

    <v-main>

    </v-main>
  </v-app>
</template>

<script>
import SideNav from './components/SideNav' //SideNav.vueをインポートし、ローカル登録を行う
export default {
  name: 'App',
  components: {
    SideNav
  },


  data: () => ({
    //
  }),
};
</script>
