<template>
    <base-chart :options="options"></base-chart>

</template>

<script>
    export default {
        name: "Area",
        data() {
            return {
                options: null
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
                this.options = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
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
                            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                            boundaryGap: false,
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
                            symbol: 'none', //去掉折线图中的节点
                            smooth: true,  //true 为平滑曲线，false为直线
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},

                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            symbol: 'none', //去掉折线图中的节点
                            smooth: true,  //true 为平滑曲线，false为直线
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},

                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            symbol: 'none', //去掉折线图中的节点
                            smooth: true,  //true 为平滑曲线，false为直线
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            symbol: 'none', //去掉折线图中的节点
                            smooth: true,  //true 为平滑曲线，false为直线
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            symbol: 'none', //去掉折线图中的节点
                            smooth: true,  //true 为平滑曲线，false为直线
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
