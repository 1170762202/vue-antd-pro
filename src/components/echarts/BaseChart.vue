<template>
    <div ref="chart" style="min-width: 200px;min-height: 200px;">

    </div>
</template>

<script>
    export default {
        name: "BaseChart",
        data() {
            return {
                chart: null,
                opt: null,
            }
        },
        props:{
            options: {
                type: Object,
                required: false
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
        mounted() {
            // this.renderChart()
        },
        methods: {
            renderChart() {
                this.opt = this.options;
                this.chart = this.$echarts.init(this.$refs.chart)
                this.chart.setOption(this.opt)
            },
        },
        watch:{
            options(){
                this.renderChart()
            }
        }
    }
</script>

<style scoped>

</style>
