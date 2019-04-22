<template>
    <div class="wrapper">
        <a-dropdown placement="bottomLeft">
            <div class="user-info">
                <img style="width: 40px; height: 40px; border-radius: 50%;
                                 border:1px solid #eee;margin-bottom: 4px"
                     src="../../assets/img/avatar.jpg" alt=""/>
                <a style="color: #000; margin-left: 5px">{{userInfo.nickName}}</a>
            </div>

            <a-menu slot="overlay"
                    @click="handleRightTopMenuClick">
                <a-menu-item key="1">
                    <a-icon type="user"/>
                    关于作者
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="paper-clip"/>
                    项目地址
                </a-menu-item>
                <a-menu-item key="3" disabled>
                    <a-icon type="set"/>
                    测试
                </a-menu-item>
                <a-menu-item key="4">
                    <a-icon type="close-circle"/>
                    退出登录
                </a-menu-item>
            </a-menu>
        </a-dropdown>

    </div>
</template>

<script>
    export default {
        name: "UserMenu",
        data() {
            return {
                userInfo: {
                    nickName: 'An生'
                },
            }
        },
        methods: {
            handleRightTopMenuClick({key, keyPath}) {
                switch (key) {
                    case "1":
                        break
                    case "2":
                        break
                    case "4":
                        localStorage.removeItem('username')
                        this.$router.push('/login');
                        break
                }
            },
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100%;
        width: auto;
        float: right;
        background: #fff;
    }

    .user-info:hover {
        background: #f9f9f9;
    }

    .user-info {
        font-size: 20px;
        color: #000;
        height: 100%;
        width: auto;
        padding-left: 10px;
        padding-right: 10px;
        float: right;
    }

</style>
