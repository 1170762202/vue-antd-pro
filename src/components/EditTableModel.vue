<template>
    <div>
        <a-modal
                title="Basic Modal"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "EditModel",
        props: {
            visible: {
                require: true,
                default: false
            }
        },

        data() {
            return {}
        },
        methods: {
            handleOk(e) {
                this.$emit('showModel')
            },
            handleCancel(e) {
                this.$emit('showModel')
            },
        }
    }
</script>

<style scoped>

</style>
