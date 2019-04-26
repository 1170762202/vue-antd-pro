<template>
    <div>

        <div style="display: flex;height: 400px;">
            <a-card :tabList="tabList" :activeTabKey="activeTabKey" hoverable
                    :loading="tabCardLoading"
                    style="height: 100%;width: 40%;"
                    @tabChange="activeTabKey => onTabChange(activeTabKey, 'activeTabKey')">
                <span slot="customRender" slot-scope="item">
                    <a-icon type="home"/>{{item.name}}</span>
                <!--                <a href="#" slot="extra">More</a>-->

                <div v-if="activeTabKey === 'tab1'" style="width: 100%;height: 100%;display: flex;
                justify-content: space-around">
                    <div class="div-inline-left">
                        <v-column style="width: 100%; height: 300px;"></v-column>
                    </div>

                </div>
                <div v-else-if="activeTabKey === 'tab2'">
                    <a-timeline mode="alternate">
                        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                        <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
                        <a-timeline-item>
                            <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;"/>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </a-timeline-item>
                        <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
                        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                        <a-timeline-item>
                            <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;"/>
                            Technical testing 2015-09-01
                        </a-timeline-item>
                    </a-timeline>
                </div>
            </a-card>

            <div style="width: 60%;margin-left: 20px;">
                <a-card title="语言详情" hoverable :bordered="false">
                    <h4>Vue</h4>
                    <a-progress :percent="30"/>
                    <h4>Android</h4>
                    <a-progress :percent="50" status="active"/>
                    <h4>IOS</h4>
                    <a-progress :percent="70" status="exception"/>
                    <h4>Js</h4>

                    <a-progress :percent="100"/>
                    <h4>Html</h4>

                    <a-progress :percent="50" :showInfo="false"/>
                </a-card>

            </div>
        </div>

        <div style="display: flex;margin-top: 20px">

            <div style="width: 100%;">
                <a-card title="最新动态" hoverable :bordered="false">
                    <a href="#" slot="extra">更多</a>

                    <div
                            class="demo-infinite-container"
                            v-infinite-scroll="handleInfiniteOnLoad"
                            :infinite-scroll-disabled="busy"
                            :infinite-scroll-distance="10"
                    >
                        <a-list
                                itemLayout="horizontal"
                                size="large"
                                :pagination="pagination"
                                :dataSource="dynamicData">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a-list-item-meta>
                                    <a slot="title" href="#">{{item.title}}</a>

                                    <a-avatar slot="avatar"
                                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                </a-list-item-meta>
                                <a-icon slot="actions" type="delete" @click="deleteDynamic(item)"></a-icon>

                            </a-list-item>
                        </a-list>
                    </div>
                </a-card>

            </div>

        </div>

    </div>
</template>

<script>

    import vColumn from '../../components/echarts/Column'
    import vBrokenLine from '../../components/echarts/BrokenLine'
    import infiniteScroll from 'vue-infinite-scroll'
    import Comment from "@/views/common/Comment";

    export default {
        name: "Dashboard",
        components: {
            Comment,
            vColumn,
            vBrokenLine,
        },
        directives: {infiniteScroll},
        data() {
            return {
                pagination: {
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                },
                loading: false,
                busy: false,
                userInfo: {
                    nickName: 'An生'
                },
                tabList: [{
                    key: 'tab1',
                    name: '最近七天用户访问量',
                    // tab: 'tab1',
                    scopedSlots: {tab: 'customRender'}
                }, {
                    key: 'tab2',
                    name: '操作动态详情',
                    // tab: 'tab2',
                    scopedSlots: {tab: 'customRender'}

                }],
                activeTabKey: 'tab1',
                tabCardLoading: true,
                dynamicData: []
            }
        },

        methods: {
            fetchData(callback) {

            },
            handleInfiniteOnLoad() {
                const dynamicData = this.dynamicData
                this.loading = true
                if (dynamicData.length > 100) {
                    this.$message.warning('Infinite List loaded all')
                    this.busy = true
                    this.loading = false
                    return
                }
                this.fetchData((res) => {
                    this.dynamicData.push(this.dynamicData)
                    this.loading = false
                })
            },
            onTabChange(key, type) {
                this[type] = key
            },
            getTabCardData() {
                setTimeout(() => {
                    this.tabCardLoading = false
                }, 1000)
            },
            getDynamicData() {
                this.dynamicData = [
                    {
                        title: '用户a上传了新的项目',
                    },
                    {
                        title: '用户b修改了管理员权限',
                    },
                    {
                        title: '用户c登录管理系统',
                    },
                    {
                        title: '用户d更改了系统权限',
                    },
                    {
                        title: '用户b修改了管理员权限',
                    },
                    {
                        title: '用户c登录管理系统',
                    },
                    {
                        title: '用户d更改了系统权限',
                    },
                    {
                        title: '用户d更改了系统权限',
                    },
                    {
                        title: '用户b修改了管理员权限',
                    },
                    {
                        title: '用户c登录管理系统',
                    },
                    {
                        title: '用户d更改了系统权限',
                    },
                ]
            },
            deleteDynamic(item) {
                console.log('item', item)
                let index = this.dynamicData.indexOf(item)
                this.dynamicData.splice(index, 1)
            }
        },

        mounted() {
            this.getTabCardData()
            this.getDynamicData()
        }

    }
</script>

<style scoped>

    .div-inline-left {
        left: 0;
        width: 100%;
    }

    .div-inline-right {
        right: 0;
        width: 50%;
    }

    .demo-infinite-container {
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        overflow: auto;
        padding: 8px 24px;
        margin-bottom: 50px;
        height: 400px;
    }

    .demo-loading {
        position: absolute;
        bottom: 40px;
        width: 100%;
        text-align: center;
    }
</style>
