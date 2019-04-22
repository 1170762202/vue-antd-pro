import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/user/Login";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/login',
            name: 'login',

            meta: {title: 'login'},
            component: () => import('./views/user/Login')
        },
        {
            path: '/',
            name: 'home',
            meta: {title: 'home'},
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
            children: [
                {
                    path: '/dashboard',
                    meta: {title: '系统首页'},
                    component: () => import('./views/page/Dashboard')
                }, {
                    path: '/base_table/first',
                    meta: {title: '样式1'},
                    component: () => import('./views/page/BaseTable')
                }, {
                    path: '/base_table/second',
                    meta: {title: '样式2'},
                    component: () => import('./views/page/BaseTable1')
                },  {
                    path: '/echart',
                    name: 'echart',
                    meta: {title: 'EChart表'},
                    component: () => import('./views/page/charts/EChart.vue')
                },
            ]
        },

    ]
})
