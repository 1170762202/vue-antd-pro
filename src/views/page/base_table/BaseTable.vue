<template>
    <div style="background: #fff; padding: 16px">
        <a-button
                style="margin: 0 8px 8px"
                type="primary"
                @click="deleteAll"
                :disabled="!hasSelected"
                :loading="deleteLoading">批量删除
        </a-button>

        <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`选中 ${selectedRowKeys.length} 项`}}
        </template>
      </span>

        <a-table
                bordered
                :rowSelection="rowSelection"
                :columns="columns"
                :dataSource="dataSource"
                :scroll="{ x: 1500}">
            <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
                <div :key="col">
                    <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                    />
                    <template v-else>{{text}}</template>
                </div>
            </template>

            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>

                    <span v-if="record.editable">
                         <a-popconfirm title='确定保存?' @confirm="() => save(record.key)">
                            <a>确定</a>
                         </a-popconfirm>
                      <a @click="() => cancel(record.key)">取消</a>
                    </span>
                    <span v-else>
                      <a @click="() => edit(record.key)">编辑</a>
                    </span>

                </div>

            </template>
        </a-table>
    </div>
</template>

<script>
    const columns = [{
        title: 'id',
        dataIndex: 'id',//和dataSource的key对应
        fixed: 'left',
        width: 100,
        sorter: (a, b) => a.id- b.id,

    }, {
        title: 'name',
        dataIndex: 'name',
        scopedSlots: {customRender: 'name'},

        sorter: (a, b) => a.name.length - b.name.length,
        filters: [{
            text: 'Tom 1',
            value: 'Tom 1',
        }, {
            text: 'Tom 2',
            value: 'Tom 2',
        }, {
            text: 'Submenu',
            value: 'Submenu',
            children: [{
                text: 'Tom 3',
                value: 'Tom 3',
            }, {
                text: 'Tom 4',
                value: 'Tom 4',
            }],
        }],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    }, {
        title: 'age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        scopedSlots: {customRender: 'age'},

    }, {
        title: 'address',
        dataIndex: 'address',
        sorter: (a, b) => a.name.length - b.name.length,
        scopedSlots: {customRender: 'address'},
    }, {
        title: 'operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 150,
        scopedSlots: {customRender: 'operation'}
    }]
    const dataSource = [];
    for (let i = 0; i < 100; i++) {
        dataSource.push({
            id: i,
            key: i,
            name: `Tom ${i}`,
            age: ++i,
            address: `address. ${i}`,
        });
    }
    export default {
        name: "BaseTable",
        data() {
            this.cacheData = dataSource.map(item => ({...item}))
            return {
                dataSource,
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                loading: false,
                deleteLoading: false,
            }
        },
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
            },
            hasSelected() {
                return this.selectedRowKeys.length > 0
            },
        },
        methods: {

            deleteAll() {
                this.deleteLoading = true;
                // ajax request after empty completing
                setTimeout(() => {
                    this.onDeleteAll()
                    this.deleteLoading = false;
                    this.selectedRowKeys = [];
                }, 1000);
            },

            handleChange(value, key, column) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target[column] = value
                    this.dataSource = newData
                }
            },
            edit(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target.editable = true
                    this.dataSource = newData
                }
            },
            onDelete(key) {
                const dataSource = [...this.dataSource]
                this.dataSource = dataSource.filter(item => item.key !== key)
            },
            onDeleteAll() {
                this.selectedRowKeys.forEach((key) => {
                    this.onDelete(key)
                })
            },
            save(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    delete target.editable
                    this.dataSource = newData
                    this.cacheData = newData.map(item => ({...item}))
                }
            },
            cancel(key) {
                const newData = [...this.dataSource]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                    delete target.editable
                    this.dataSource = newData
                }
            },
        },
    }
</script>

<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }

</style>
