<template>
    <div>

        <a-row :gutter="16">
            <a-col :span="8">
                <a-card title="柱形图" :bordered=false>
                    <v-column style="width: 50%"></v-column>

                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="饼状图" :bordered=false>
                    <v-pie style="width: 50%"></v-pie>

                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="柱形图" :bordered=false>
                    <v-column-y style="width: 50%"></v-column-y>
                </a-card>
            </a-col>
        </a-row>

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
