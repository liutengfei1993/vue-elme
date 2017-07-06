// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
//webpack.base.conf.js==>'common': path.resolve(__dirname,"../src/common")
import "common/stylus/index.styl";

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

var router = new VueRouter({
    linkActiveClass: 'active',
    routes // （缩写）相当于 routes: routes
})

var app = new Vue({
  router,
  template: '<App/>',
  components: { App },
  data: {
    eventHub: new Vue()
  }
}).$mount('#app');

router.push("/goods");//默认选中























/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// });