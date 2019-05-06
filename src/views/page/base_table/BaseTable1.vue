<template>
    <div style="background: #fff; padding: 16px">

        <div >
            <a-input placeholder="姓名"class="duan"/>
            <a-date-picker @change="onDateChange" class="duan" placeholder="选择时间"/>
            <a-input-number :min="1" :max="99" v-model="age" class="duan" @change="onAgeChange" placeholder="输入年龄"
                           />
            <a-cascader :options="addrData" :displayRender="displayAddrRender" expandTrigger="hover"
                        @change="onAddrChange"
                        class="duan"
                        placeholder="选择地址" />
            <a-button type="primary" style="margin-left: 10px;">查询</a-button>
            <a-button type="primary" style="margin-left: 10px;">导出数据</a-button>
        </div>

        <a-button
                style=" margin: 14px 8px 8px
            "
                type="primary"
                @click="deleteAll"
                :disabled="!hasSelected"
                :loading="deleteLoading">批量删除
        </a-button>

        <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </span>

        <a-table
                bordered
                :pagination="{pageSize:8}"
                :rowSelection="rowSelection"
                :columns="columns"
                :dataSource="dataSource"
                :scroll="{ x: 1500}">

            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <a-button type="primary" @click="() => handleEdit(record.key)">编辑</a-button>
                    <a-button type="danger" @click="() => handleDelete(record.key)"
                              style="margin-left: 10px;background:#FF2E2C ;color: white">删除
                    </a-button>
                </div>
            </template>
        </a-table>

        <vEditModel :visible="editModelVisible" @showModel="toShowModel"></vEditModel>

    </div>
</template>

<script>
    import vEditModel from '../../../components/EditTableModel'
    import {dateTime} from '../../../utils/DataTime'

    const columns = [{
        title: 'id',
        dataIndex: 'id',//和dataSource的key对应
        fixed: 'left',
        width: 100,
    }, {
        title: '姓名',
        dataIndex: 'name',

    }, {
        title: '年龄',
        dataIndex: 'age',

    }, {
        title: '地址',
        dataIndex: 'address',
    }, {
        title: '时间',
        dataIndex: 'time',
    }, {
        title: 'operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 250,
        scopedSlots: {customRender: 'operation'},

    }]

    export default {
        name: "BaseTable",
        components: {
            vEditModel
        },
        data() {
            return {
                age: 1,
                dataSource: [],
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                loading: false,
                deleteLoading: false,
                editModelVisible: false,
                addrData: [{
                    value: 'fj',
                    label: '福建',
                    children: [{
                        value: 'xm',
                        label: '厦门',
                        children: [{
                            value: 'hl',
                            label: '湖里区',
                        }, {
                            value: 'sm',
                            label: '思明区',
                        }, {
                            value: 'xa',
                            label: '翔安区',
                        },],
                    }],
                }, {
                    value: 'qz',
                    label: '泉州',
                    children: [{
                        value: 'qzd',
                        label: '泉州东',
                        children: [{
                            value: 'qzd1',
                            label: '泉州东1',
                        }, {
                            value: 'qzd2',
                            label: '泉州东2',
                        }, {
                            value: 'qzd3',
                            label: '泉州东3',
                        },],
                    }],
                },],
            }

        },
        mounted() {

            for (let i = 0; i < 100; i++) {
                this.dataSource.push({
                    id: i,
                    key: i,
                    time: dateTime.getDate(),
                    name: `Tom ${i}`,
                    age: (i + 1),
                    address: `address. ${i}`,
                    tags: [i]
                });
            }
        }
        ,
        computed: {
            rowSelection() {
                return {
                    selectedRowKeys: this.selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        this.selectedRowKeys = selectedRowKeys
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    getCheckboxProps: record => ({
                        props: {
                            // Column configuration not to be checked
                            // disabled: record.name === 'Edrward 2',
                            name: record.name,
                        }
                    }),
                    hideDefaultSelections: true,
                    selections: [{
                        key: 'all-data',
                        text: 'Select All Data',
                        onSelect: () => {
                            this.selectedRowKeys = [...Array(this.dataSource.length).keys()]; // 0...45
                        },
                    }, {
                        key: 'odd',
                        text: 'Select Odd Row',
                        onSelect: (changableRowKeys) => {
                            let newSelectedRowKeys = [];
                            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                if (index % 2 !== 0) {
                                    return false;
                                }
                                return true;
                            });
                            this.selectedRowKeys = newSelectedRowKeys;
                        },
                    }, {
                        key: 'even',
                        text: 'Select Even Row',
                        onSelect: (changableRowKeys) => {
                            let newSelectedRowKeys = [];
                            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                if (index % 2 !== 0) {
                                    return true;
                                }
                                return false;
                            });
                            this.selectedRowKeys = newSelectedRowKeys;
                        },
                    }],
                }
            }
            ,
            hasSelected() {
                return this.selectedRowKeys.length > 0
            }
            ,
        },
        methods: {
            onAddrChange(value) {
                console.log('onAddrChange', value)
            },
            displayAddrRender({labels, selectedOptions}) {
                var val = '';
                selectedOptions.map((item, index) => {
                    val += item.label + '/'
                })
                return val;
            },
            onAgeChange(value) {
                console.log('age', value)
            },
            onDateChange(date, dateString) {
                console.log('date', date, 'dateString', dateString)
            },
            deleteAll() {
                this.deleteLoading = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.onDeleteAll()
                    this.deleteLoading = false;
                    this.selectedRowKeys = [];
                }, 1000);
            }
            ,

            handleChange(value, key, column) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target[column] = value
                    this.dataSource = newData
                }
            }
            ,
            edit(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target.editable = true
                    this.dataSource = newData
                }
            }
            ,
            onDelete(key) {
                const dataSource = [...this.dataSource]
                this.dataSource = dataSource.filter(item => item.key !== key)
            }
            ,
            onDeleteAll() {
                this.selectedRowKeys.forEach((key) => {
                    this.onDelete(key)
                })
            }
            ,
            save(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    delete target.editable
                    this.dataSource = newData
                    this.cacheData = newData.map(item => ({...item}))
                }
            }
            ,
            cancel(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                    delete target.editable
                    this.dataSource = newData
                }
            }
            ,
            handleMenuClick({item, key, keyPath}) {
                switch (key) {
                    case "edit":
                        this.handleEdit()
                        break
                    case "delete":
                        this.handleDelete()
                        break;
                }
            }
            ,
            handleEdit(key) {
                this.editModelVisible = true
            }
            ,
            handleDelete(key) {
                this.onDelete(key)
                this.$message.success('操作成功');
            }
            ,
            toShowModel() {
                this.editModelVisible = !this.editModelVisible
            }
        }
        ,
    }
</script>

<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }

    .duan {
        margin-left: 10px;
        width: 20%;
    }
</style>
