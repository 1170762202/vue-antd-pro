<template>
    <div style="height: 100%;background: white">

        <div title="柱形图" :bordered=false>
            <v-column style="width: auto"></v-column>

        </div>

        <div title="饼状图" :bordered=false>
            <v-pie style="width: auto"></v-pie>

        </div>

        <div title="柱形图" :bordered=false>
            <v-column-y style="width: auto"></v-column-y>
        </div>

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
