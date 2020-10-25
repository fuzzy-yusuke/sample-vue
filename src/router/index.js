import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'

Vue.use(VueRouter) //引数としてプラグインを渡して、機能を拡張出来る

//routerの設定
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: Addresses
  },
  {
    path: '/addresses/:address_id?/edit', //「:」を含ませることで、パスに含まれるID等の値をコンポーネントで受け取らせる。「?」はオプションとして扱われる
    name: 'address_edit',
    component: AddressForm
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue') 
    //このように関数でコンポーネントを指定することで、逐一importを記述しなくて良くなる→ファイルの読み込みが速くなる
  }
]

//パスの設定
const router = new VueRouter({
  mode: 'history',  //history：パスの記載を「/」で区切る記法
  base: process.env.BASE_URL,
  routes
})

export default router
