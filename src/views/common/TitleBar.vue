<template>
    <div style="background: #fff; height: 60px;display: flex;
    padding-left: 20px;font-size: 20px;
    font-weight: bolder;
    align-items:Center;">

        {{title}}
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: {
            title: {
                require: true,
                default: '系统首页'
            }
        },
        data() {
            return {}
        },
    }
</script>

<style scoped>

</style>
