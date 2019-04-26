<template>
    <div class="wrapper">
        <div>
            <a-layout id="components-layout-demo-custom-trigger">

                <a-layout-sider
                        :style="{width:'200px'}"
                        :trigger="null"
                        :collapsible="true"
                        v-model="collapsed">
                    <div class="logo">
                        <p>后台管理系统</p>
                    </div>
                    <a-menu theme="dark" mode="inline"
                            @click="menuClick"
                            @openChange="openChange"
                            :openKeys="openKeys"
                            :selectedKeys="selectedKeys">
                        <template v-for="item in items"><!--一级遍历-->

                            <template v-if="item.subs"><!--如果存在子集-->
                                <a-sub-menu :key=item.path :index="item.index">
                                    <span slot="title"><a-icon :type="item.icon"/><span>{{item.title}}</span></span>

                                    <template v-for="subItem in item.subs"><!--//二级遍历-->
                                        <a-sub-menu v-if="subItem.subs" :key=subItem.path><!--如果存在子集-->
                                            <template slot="title">{{ subItem.title }}</template>
                                            <a-menu-item v-for="(threeItem,i) in subItem.subs" :key="threeItem.path"
                                                         :index="threeItem.index"><!--三级遍历-->
                                                <span>{{threeItem.title}}</span>
                                            </a-menu-item>
                                        </a-sub-menu>

                                        <a-menu-item v-else :key=subItem.path :index="subItem.index">
                                            <span>{{subItem.title}}</span>
                                        </a-menu-item>
                                    </template>
                                </a-sub-menu>
                            </template>

                            <template v-else>
                                <a-menu-item :key=item.path :index="item.index">
                                    <span><a-icon :type="item.icon"/><span>{{item.title}}</span></span>
                                </a-menu-item>
                            </template>
                        </template>
                    </a-menu>
                </a-layout-sider>

                <a-layout>
                    <v-header></v-header>

                    <v-tabs style="margin-top: 3px"></v-tabs>
                    <v-title :title="titleBar"></v-title>

                    <a-layout-content
                            :style="{ height: 'auto',width:'100%',minHeight:'100vh',padding:'16px'}">

                        <!-- 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。-->
                        <keep-alive :include="tagsList">
                            <router-view></router-view>
                        </keep-alive>
                    </a-layout-content>
                </a-layout>

            </a-layout>
        </div>

        <setting-side-bar></setting-side-bar>
    </div>

</template>

<script>
    // @ is an alias to /src
    import vTabs from '@/components/MultiTab'
    import vHeader from "@/views/common/Header.vue";
    import vUserMenu from '@/views/common/TopRightMenu'
    import SettingSideBar from "@/views/common/SettingSideBar";
    import vTitle from "@/views/common/TitleBar";

    export default {
        name: 'home',
        components: {
            vTitle,
            SettingSideBar,
            vHeader,
            vTabs,
            vUserMenu,
        },
        data() {
            return {
                collapsed: false,
                titleBar: '系统首页',
                selectedKeys: [this.$route.fullPath],
                openKeys: [],
                tagsList: [],
                items: [
                    {
                        icon: 'user',
                        index: '0',
                        path: '/dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'table',
                        index: '1',
                        path: '/base_table',
                        title: '基础表格',
                        subs: [
                            {
                                index: '1-0',
                                path: '/base_table/first',
                                title: '样式1',
                            }, {
                                index: '1-1',
                                path: '/base_table/second',
                                title: '样式2',
                            },
                        ]
                    },
                    {
                        icon: 'interation',
                        index: '2',
                        path: '/process',
                        title: '流程图',
                        subs: [
                            {
                                index: '2-0',
                                path: '/process/first',
                                title: '交易流程图',
                            },
                        ]
                    },
                    {
                        icon: 'area-chart',
                        index: '3',
                        path: '/echart',
                        title: 'EChart表'
                    },
                    {
                        icon: 'warning',
                        index: '4',
                        path: '/warning',
                        title: '错误处理',
                        subs: [
                            {
                                index: '4-0',
                                path: '/warning/first',
                                title: '权限测试',
                            }, {
                                index: '4-1',
                                path: '/warning/second',
                                title: '403',
                            }, {
                                index: '4-2',
                                path: '/warning/third',
                                title: '404',
                            },
                        ]
                    },
                ],
            }
        },
        methods: {

            menuClick({item, key, keyPath}) {
                this.$router.push(key)
            },
            openChange(keys) {
                this.openKeys = keys
                console.log('openChange', keys)
            },

            setItem(router) {
                this.selectedKeys = [router.fullPath]
                // this.openKeys = ['/base_table']
                this.items.forEach((item) => {
                    if (item.subs && item.subs.length > 0) {
                        item.subs.forEach((subItem) => {
                            if (subItem.path === router.fullPath) {
                                this.openKeys = [item.path]
                            }
                        })
                    }
                })
            },
        },
        watch: {
            $route(newValue, oldValue) {
                console.log('router', newValue)
                this.setItem(newValue)
                // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
                this.tagsList.push(newValue)
                this.titleBar = newValue.meta.title
            }
        },
    }
</script>
<style lang="scss">
    .wrapper {
        height: 100%;
        width: 100%;
        background: #666;
        background-size: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }


    .header {
        background: #fff;
        padding: 0;
        height: 64px;
        box-shadow: 0 1px 2px #FDFDFD;
    }


    #components-layout-demo-custom-trigger .trigger {
        font-size: 20px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
        background: #f9f9f9;
        height: 100%;
    }

    #components-layout-demo-custom-trigger .logo {
        height: auto;
        background: rgba(255, 255, 255, .2);
        margin: 16px;
        color: #fff;
        font-size: 20px;
        text-align: center;
    }

</style>
