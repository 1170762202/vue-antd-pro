<template>
    <div>

        <a-card title="柱形图" :bordered=false>
            <v-column style="width: auto"></v-column>

        </a-card>

        <a-card title="饼状图" :bordered=false>
            <v-pie style="width: auto"></v-pie>

        </a-card>

        <a-card title="柱形图" :bordered=false>
            <v-column-y style="width: auto"></v-column-y>
        </a-card>

    </div>
</template>

<script>
    import vColumn from '../../../components/echarts/Column'
    import vPie from '../../../components/echarts/Pie'
    import vColumnY from '../../../components/echarts/ColumnY'
    export default {
        name: "EChart",
        components: {
            vColumn, vPie, vColumnY
        }
    }
</script>

<style scoped>

</style>
