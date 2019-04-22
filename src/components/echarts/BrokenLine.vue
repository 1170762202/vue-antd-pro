<template>
    <base-chart :options="options"></base-chart>
</template>

<script>
    import {dateTime} from '../../utils/DataTime'
    import BaseChart from "@/components/echarts/BaseChart";

    export default {
        name: "BrokenLine",
        components: {BaseChart},
        data() {
            return {
                options: null,
                xData: [],
                data:[],
            }
        },

        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                this.afterRequestData()
            },
            afterRequestData() {
                this.xData = dateTime.getWeek()
                this.data=[1000, 5002, 2000, 3304, 3900, 3300, 2020]
                this.options = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.data,
                        type: 'line',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    }]
                }
            }
        }
    }
</script>

<style scoped>

</style>
