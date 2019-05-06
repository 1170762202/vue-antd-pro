<template>
    <base-chart :options="options" style="width: 100%;height: auto"></base-chart>
</template>

<script>
    import {dateTime} from '../../utils/DataTime'
    import BaseChart from "@/components/echarts/BaseChart";

    export default {
        name: "Column",
        components: {BaseChart},
        data() {
            return {
                options: null,
                xData: [],
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
                this.options = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true//坐标刻度值显示
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.xData,
                            show: true
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            show: true
                        }
                    ],
                    series: [
                        {
                            name: '访问量',
                            type: 'bar',
                            barWidth: '60%',
                            data: [1000, 5002, 2000, 3304, 3900, 3300, 2020]
                        },
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
