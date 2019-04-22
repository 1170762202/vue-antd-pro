<template>
    <div class="wrapper">
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

</template>

<script>
    // @ is an alias to /src
    import vTabs from '@/components/MultiTab'
    import vHeader from "../components/Header";
    import vUserMenu from '@/views/common/TopRightMenu'

    export default {
        name: 'home',
        components: {
            vHeader,
            vTabs,
            vUserMenu,
        },
        data() {
            return {
                collapsed: false,
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
                                index: '1-0',
                                path: '/base_table/second',
                                title: '样式2',
                            },
                        ]
                    }, {
                        icon: 'area-chart',
                        index: '2',
                        path: '/echart',
                        title: 'EChart表'
                    },
                    // {
                    //     icon: 'video-camera',
                    //     index: '1',
                    //     path: '/second',
                    //     title: '导航2',
                    //     subs: [
                    //         {
                    //             icon: 'video-camera',
                    //             index: '1-0',
                    //             path: '/second/first',
                    //             title: '导航2-0',
                    //         }, {
                    //             icon: 'video-camera',
                    //             index: '1-1',
                    //             path: '/second/second',
                    //             title: '导航2-1',
                    //         },
                    //     ]
                    // }, {
                    //     icon: 'video-camera',
                    //     index: '2',
                    //     path: '/third',
                    //     title: '导航3',
                    //     subs: [
                    //         {
                    //             icon: 'video-camera',
                    //             index: '3-0',
                    //             path: '/third/first',
                    //             title: '导航3-0',
                    //         }, {
                    //             icon: 'video-camera',
                    //             index: '3-1',
                    //             path: '/third/second',
                    //             title: '导航3-1',
                    //             subs: [
                    //                 {
                    //                     icon: 'video-camera',
                    //                     index: '3-1-1',
                    //                     path: '/third/second/first',
                    //                     title: '导航3-1-1',
                    //                 },
                    //                 {
                    //                     icon: 'video-camera',
                    //                     index: '3-1-1',
                    //                     path: '/third/second/second',
                    //                     title: '导航3-1-2',
                    //                 },
                    //
                    //             ]
                    //         },
                    //     ]
                    // },
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
            }
        },
    }
</script>
<style lang="scss">

    .question {
        font-size: 20px;
        line-height: 64px;
        padding: 0 6px;
        cursor: pointer;
        transition: color .3s;
        color: #000;
    }

    .question:hover {
        background: #f9f9f9;
        color: #1890ff;

    }


    .wrapper {
        height: 100%;
        width: 100%;
        background: #666;
        background-size: 100%;
    }

    .header-right-info {
        float: right;
        height: 100%;
        width: auto;
        margin-right: 20px;
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
