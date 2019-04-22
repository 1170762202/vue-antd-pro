<template>
    <div>
        <div style="background-color: #fff;height: 120px;">
            <div style="color: #000;
        height: 100%;
        width: auto;
padding: 20px">
                <img style="width: 80px; height: 80px; border-radius: 50%;
                               margin-bottom: 4px;float: left;"
                     src="../../assets/img/avatar.jpg"/>
                <div style="float: left;margin-left: 5px">
                    <p style="color: #000;font-size: 20px; margin-top: 6px">{{userInfo.nickName}}</p>
                    <p style="color: #888888;font-size: 14px;">我是一名安卓机器人</p>
                </div>


                <div style="float: right;margin-right: 20px;">
                    <div style="font-size: 20px;text-align: center">
                        <p>用户数量:</p>
                        <p>1234</p>
                    </div>
                </div>
                <div style="float: right;margin-right: 20px;">
                    <div style="font-size: 20px;text-align: center">
                        <p>上次登录时间:</p>
                        <p>12:00</p>
                    </div>
                </div>
            </div>
        </div>

        <br/><br/>

        <div>
            <a-card :tabList="tabList" :activeTabKey="activeTabKey" hoverable
                    :loading="tabCardLoading"
                    style="min-height:440px"
                    @tabChange="activeTabKey => onTabChange(activeTabKey, 'activeTabKey')">
                <span slot="customRender" slot-scope="item">
                    <a-icon type="home"/>{{item.name}}</span>
                <!--                <a href="#" slot="extra">More</a>-->

                <div v-if="activeTabKey === 'tab1'" style="width: 100%;height: 100%;display: flex;
                justify-content: space-around">
                    <div class="div-inline-left">
                        <v-column style="width: 100%; height: 300px;"></v-column>
                    </div>
                    <div class="div-inline-right">
                        <v-broken-line style="width:100%; height: 330px;"></v-broken-line>
                    </div>

                </div>
                <div v-else-if="activeTabKey === 'tab2'">

                </div>

            </a-card>
        </div>

        <div style="display: flex;margin-top: 20px">


            <div style="width: 40%;">

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

            <div style="width: 60%;margin-left: 20px">
                <a-card title="最新动态" hoverable :bordered="false">
                    <a href="#" slot="extra">更多</a>
                    <a-list
                            itemLayout="horizontal"
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
                </a-card>
            </div>
        </div>

    </div>
</template>

<script>

    import vColumn from '../../components/echarts/Column'
    import vBrokenLine from '../../components/echarts/BrokenLine'

    export default {
        name: "Dashboard",
        components: {
            vColumn, vBrokenLine
        },
        data() {
            return {
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
                    name: '流量统计',
                    // tab: 'tab2',
                    scopedSlots: {tab: 'customRender'}

                }],
                activeTabKey: 'tab1',
                tabCardLoading: true,
                dynamicData: []
            }
        },

        methods: {
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
        width: 48%;
    }

    .div-inline-right {
        right: 0;
        width: 48%;
    }

</style>
