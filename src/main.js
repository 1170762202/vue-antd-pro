import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.css";
import antd from 'ant-design-vue'
import api from '@/api/api'

import echarts from 'echarts'

//引入nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts
Vue.use(antd);


router.beforeEach((to, from, next) => {
    NProgress.start()
    const role = localStorage.getItem('username');

    if (!role && to.path !== '/login') {
        next('/login');
    }
    else if (to.fullPath === '/warning/first') {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/warning/second');
    }
    else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/rich-text-editor/first') {
            this.$notification['error']({
                message: 'vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看\', \'浏览器不兼容通知',
                duration: 4
            })
        } else {
            next();
        }
    }
});

router.afterEach(() => {
    NProgress.done()
})

// Vue.http.interceptors.push((request, next) => {
//     NProgress.start();
//
//     next((response)=>{
//         NProgress.done();
//     });
// });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


