<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>連絡先編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="address.name" label="名前"></v-text-field>
               <v-text-field v-model="address.tel" label="電話番号"></v-text-field>
               <v-text-field v-model="address.email" label="メールアドレス"></v-text-field>
               <v-text-field v-model="address.address" label="住所"></v-text-field>
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'addresses' })">キャンセル</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
               </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  created(){
    if(!this.$route.params.address_id) return //ルートのパラメータにIDが含まれているかチェック(無ければ新規作成へ)
    const address=this.$store.getters.getAddressById(this.$route.params.address_id)
    if(address){
      this.address = address
    }else{
      this.$router.push({ name: 'addresses'}) //データを取得出来なかった場合は一覧ページへ戻る
    }
  },
  data () {
    return {
      address: {}
    }
  },
  methods:{
      submit(){
        if(this.$route.params.address_id){ //既存のIDの場合、更新処理に入る
          this.updateAddress({id: this.$route.params.address_id, address:this.address})
        }else{
          this.addAddress(this.address)
        }
          this.$router.push({name:'addresses'}) //保存の完了後、連絡先一覧ページへ移動
          this.address={}                       //連絡先ページへ移動後、追加ページで入力されたデータをリセットする(配列の中を空にする感じ)
      },
      ...mapActions(['addAddress','updateAddress'])
  }
}
</script>