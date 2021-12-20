import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

import {postRequest} from './utils/api'
import {putRequest} from './utils/api'
import {getRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import { initMenu } from './utils/menus'

Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'})

// 以插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;


router.beforeEach((to, from, next) => {
  // 是否登录
  if (window.sessionStorage.getItem("tokenStr")) {
    initMenu(router, store)
    // 判断用户信息是否存在
    if(!window.sessionStorage.getItem("user")){
      return getRequest('/admin/info').then(res => {
        if(res) {
          // 存入用户信息
          window.sessionStorage.setItem("user", JSON.stringify(res));
          // 全局同步用户信息
          store.commit("INIT_ADMIN", res);
          next();
        }
      })
    }
    next()
  } else {
    if(to.path === '/') {
      next()
    }else {
      next('/?redirect='+to.path)
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')