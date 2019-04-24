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
          {{`Selected ${selectedRowKeys.length} items`}}
        </template>
      </span>

        <a-table
                bordered
                :rowSelection="rowSelection"
                :columns="columns"
                :dataSource="dataSource"
                :scroll="{ x: 1500}">

            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <a-dropdown>
                        <a-menu slot="overlay" @click="handleMenuClick">
                            <a-menu-item key="edit"
                                         :value="record.key">
                                <a-icon type="edit"/>
                                编辑
                            </a-menu-item>
                            <a-menu-item key="delete"
                                         :value="record.key">
                                <a-icon type="delete"/>
                                删除
                            </a-menu-item>
                        </a-menu>
                        <a style="margin-left: 8px">更多
                            <a-icon type="down"/>
                        </a>
                    </a-dropdown>
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
        title: 'name',
        dataIndex: 'name',

    }, {
        title: 'age',
        dataIndex: 'age',

    }, {
        title: 'address',
        dataIndex: 'address',
    }, {
        title: 'time',
        dataIndex: 'time',
    }, {
        title: 'operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 150,
        scopedSlots: {customRender: 'operation'},

    }]

    export default {
        name: "BaseTable",
        components: {
            vEditModel
        },
        data() {
            return {
                dataSource: [],
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                loading: false,
                deleteLoading: false,
                editModelVisible: false,

            }

        },
        mounted() {

            for (let i = 0; i < 100; i++) {
                this.dataSource.push({
                    id: i,
                    key: i,
                    time:dateTime.getDate(),
                    name: `Tom ${i}`,
                    age: (i + 1),
                    address: `address. ${i}`,
                    tags: [i]
                });
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
            handleMenuClick({item, key, keyPath}) {
                switch (key) {
                    case "edit":
                        this.editModelVisible = true
                        break
                    case "delete":
                        this.onDelete(item.value)
                        break
                }
            },
            toShowModel() {
                this.editModelVisible = !this.editModelVisible
            }
        },
    }
</script>

<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }

</style>
