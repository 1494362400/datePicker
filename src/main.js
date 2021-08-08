import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/index'
import moment from 'moment'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
moment.locale("zh-cn")
Vue.prototype.$moment=moment
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


