<template>
  <v-container fluid fill-height>
  
    <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="photoURL" :src="photoURL">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{userName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
          <!--↑ルーターの機能も拡張されている為、「to」を加えることでリンクが設定できる-->
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      items: [
        { title: 'ホーム', icon:'mdi-home',link:{ name: 'home'}},
        { title: '連絡先一覧', icon: 'mdi-menu',link:{name:'addresses'} } //メニュータイトルと中身をコントロール
      ]
    }
  },
  computed:{                                                            //ログインした時だけ名前と画像を表示させたりする為、computedで組む。
    ...mapGetters(['userName','photoURL'])                              //これにより、コンポーネントの一つのプロパティとしてgetterの戻り値を参照できる
  }
}
</script>