<style scoped>
.export-btn {
    margin-left: 10px;
}

.list {
    /*width: 100%;*/
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
<template>
    <div>
        <Table stripe class="list" height="750" :columns="tableColumns" :data="listData" ref="itemTable"></Table>
        <div>
            <Button type="primary" size="large" @click="exportData(1)" class="export-btn">
                <Icon type="ios-download-outline"></Icon> 导出为excel
            </Button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['listData'],
    methods: {
        exportData(type) {
            if (type === 1) {
                this.$refs.itemTable.exportCsv({
                    filename: '商品数据'
                });
            }
        },
        show(index) {
            this.$Modal.info({
                title: '商品图片',
                content: `XXX`
            })
        },
        remove(params) {            
            var itemID = params.row.itemID;
            console.info(itemID);
            this.$ajax.post(this.$store.state.api + '/item/delete', {
                itemID: itemID
            }).then(response => {
                this.$Message.success('删除成功');
                this.listData.splice(params.index, 1);
            }, response => {
                // console.info(response);
                this.$Message.error('删除失败');
            });
        }
    },
    data() {
        return {
            tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品编号',
                    key: 'itemID'
                },
                {
                    title: '商品名称',
                    key: 'itemName'
                },
                {
                    title: '商品类型',
                    key: 'itemType'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData: this.listData
        }
    }
}

</script>
