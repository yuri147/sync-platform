<style scoped>
.export-btn {
    margin-left: 10px;
}

.list {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
<template>
    <div>
        <Table stripe class="list" height="750" :columns="tableColumns" :data="listData" ref="orderTable"></Table>
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
                this.$refs.orderTable.exportCsv({
                    filename: '订单数据'
                });
            }
        },
        remove(params) {            
            var orderID = params.row.orderID;
            console.info(orderID);
            this.$ajax.post(this.$store.state.api + '/order/delete', {
                orderID: orderID
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
                    title: '订单号',
                    width: 300,
                    key: 'orderID'
                },
                {
                    title: '商品编号',
                    // width: 300,
                    key: 'itemID'
                },
                {
                    title: '商品名称',
                    width: 200,
                    key: 'itemName'
                },
                {
                    title: '购买人姓名',
                    width: 100,
                    key: 'buyerName'
                },
                {
                    title: '购买人手机号',
                    width: 200,
                    key: 'buyerPhone'
                },
                {
                    title: '地址',
                    width: 800,
                    key: 'buyerAddress'
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
