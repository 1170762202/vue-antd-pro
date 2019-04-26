<template>
    <div>
        <div :class="!this.visible?'setting-drawer-index-handle':'setting-drawer-index-handle-show'">
            <a-icon type="setting" v-if="!visible" @click="hide"/>
            <a-icon type="close" v-else @click="hide"/>

        </div>

        <a-drawer
                title="Basic Drawer"
                placement="right"
                :closable="false"
                @close="onClose"
                :visible="visible">

            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </div>

</template>

<script>
    export default {
        name: "SettingSideBar",
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            hide() {
                this.visible = !this.visible
            },
            onClose() {
                this.visible = false
            },
        },
        watch: {
            visible() {
                console.log(this.visible)

            }
        }
    }
</script>

<style lang="scss">
    @keyframes setMoveLeft {
        from {
            right: 0px;
        }
        to {
            right: 256px;
        }
    }


    .setting-drawer-index-handle-show {
        position: absolute;
        top: 240px;
        background: #1890ff;
        width: 48px;
        height: 48px;
        animation: setMoveLeft 0.3s;

        right: 256px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        pointer-events: auto;
        z-index: 1001;
        text-align: center;
        font-size: 16px;
        border-radius: 4px 0 0 4px;
        i {
            color: rgb(255, 255, 255);
            font-size: 20px;
        }
    }

    .setting-drawer-index-handle {
        position: absolute;
        top: 240px;
        background: #1890ff;
        width: 48px;
        height: 48px;

        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        pointer-events: auto;
        z-index: 1001;
        text-align: center;
        font-size: 16px;
        border-radius: 4px 0 0 4px;

        i {
            color: rgb(255, 255, 255);
            font-size: 20px;
        }
    }


</style>
