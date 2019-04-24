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
                    component: () => import('./views/page/base_table/BaseTable')
                }, {
                    path: '/base_table/second',
                    meta: {title: '样式2'},
                    component: () => import('./views/page/base_table/BaseTable1')
                },  {
                    path: '/echart',
                    name: 'EChart表',
                    meta: {title: 'EChart表'},
                    component: () => import('./views/page/charts/EChart.vue')
                }, {
                    path: '/warning/first',
                    name: 'permission',
                    meta: {title: '权限测试'},
                    component: () => import('./views/page/exception/Permission.vue')
                }, {
                    path: '/warning/second',
                    name: '403',
                    meta: {title: '403'},
                    component: () => import('./views/page/exception/403.vue')
                }, {
                    path: '/warning/third',
                    name: '404',
                    meta: {title: '404'},
                    component: () => import('./views/page/exception/404.vue')
                },{
                    path: '/process/first',
                    name: '交易流程图',
                    meta: {title: '交易流程图'},
                    component: () => import('./views/page/process/TransactionProcess.vue')
                },
            ]
        },

    ]
})
