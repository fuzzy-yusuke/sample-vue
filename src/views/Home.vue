<template>
    <v-container text-center justify-center>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>マイアドレス帳</h1>
                <p>ご利用の方はGoogleアカウントでログインして下さい</p>
            </v-flex>
            <v-flex>
                <v-btn color='info' @click="login">Googleアカウントでログイン</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods:{
        ...mapActions(['login'])
    }
    }    
</script>

<style scoped lang="scss">
</style>