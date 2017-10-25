// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import urlLoader from 'url-loader'
import App from './App'
import router from './router'

// import goods from 'components/goods/goods'
// import ratings from 'components/ratings/ratings'
// import seller from 'components/seller/seller'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(urlLoader)


// const router = new VueRouter({
//     routes: [{
//         path: '/goods',
//         component: goods
//     }, {
//         path: '/ratings',
//         component: ratings
//     }, {
//         path: '/seller',
//         component: seller
//     }],
//     linkActiveClass: 'active'
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router,
  template: '<App/>',
  components: { App },
    router
})
