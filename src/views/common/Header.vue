<template>
    <div>
        <a-layout-header class="header">
            <a-icon class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="()=> collapsed = !collapsed"/>

            <div class="header-right-info">

                <a-tooltip>
                    <template slot='title'>
                        ant design
                    </template>
                    <a href="https://vue.ant.design/docs/vue/introduce-cn/" target="_blank">
                        <a-icon type="question-circle" class="question"></a-icon>
                    </a>
                </a-tooltip>

                <a-popover
                        title="未读消息">
                    <a-badge :count="100" :show-zero="false" :overflowCount="99" :offset="[-10,14]">
                        <a-icon type="bell" class="question"></a-icon>
                    </a-badge>
                    <div slot="content">
                        <a-list
                                itemLayout="horizontal"
                                :loading="loading"
                                :dataSource="unReadData">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a-list-item-meta>
                                    <a slot="title" href="#">{{item.title}}</a>

                                    <a-avatar slot="avatar"
                                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                </a-list-item-meta>

                            </a-list-item>
                        </a-list>
                    </div>
                </a-popover>

                <user-menu></user-menu>
            </div>
        </a-layout-header>
    </div>
</template>

<script>
    import UserMenu from "@/views/common/TopRightMenu";

    export default {
        name: "Header",
        components: {UserMenu},
        data() {
            return {
                collapsed: false,
                visible: false,
                loading: true,
                unReadData: [],
            }
        },

        methods: {
            getUnReadData() {
                setTimeout(() => {
                    this.unReadData = [
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
                    this.loading = false
                }, 5000)

            },
        },
        mounted() {
            this.getUnReadData()
        }

    }
</script>

<style scoped>
    .header {
        background: #fff;
        padding: 0;
        height: 64px;
        box-shadow: 0 1px 2px #FDFDFD;
    }

    .question {
        font-size: 20px;
        line-height: 64px;
        padding: 0 6px;
        cursor: pointer;
        transition: color .3s;
        color: #000;
        margin-right: 16px;
    }

    .question:hover {
        background: #f9f9f9;
        color: #1890ff;

    }

    .header-right-info {
        float: right;
        height: 100%;
        width: auto;
        margin-right: 20px;
    }
</style>
