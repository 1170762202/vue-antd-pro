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

            }
        },


    }
</script>

<style scoped>
    .header {
        background: #fff;
        padding: 0;
        height: 64px;
        box-shadow: 0 1px 2px #FDFDFD;
    }
</style>
