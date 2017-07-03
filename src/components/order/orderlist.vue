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
        <Table stripe class="list" height="750" :columns="tableColumns" :data="orderTableData" ref="orderTable"></Table>
        <div>
            <Button type="primary" size="large" @click="exportData(1)" class="export-btn">
                <Icon type="ios-download-outline"></Icon> 导出为excel
            </Button>
        </div>
    </div>
</template>
<script>
export default {    
    props: [],
    methods: {
        exportData(type) {
            if (type === 1) {
                this.$refs.orderTable.exportCsv({
                    filename: '订单数据'
                });
            }
        },
        show(index) {
            console.info(index);
            console.info(this.orderTableData)
            this.$Modal.info({
                title: '订单详情',
                content: `<div>录入日期：` + this.orderTableData[index].creatTime + `</div>
                          <div>录入人员：`+ this.orderTableData[index].creatUser + `</div>`
            })
        },
        remove(params) {
            var orderID = params.row.orderID;
            console.info(orderID);
            this.$ajax.post(this.$store.state.api + '/order/delete', {
                orderID: orderID
            }).then(response => {
                this.$Message.success('删除成功');
                this.orderTableData.splice(params.index, 0);
            }, response => {
                // console.info(response);
                this.$Message.error('删除失败');
            });
        }
    },
    data() {
        return {
            orderTableData:[],
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
                            }, '详情'),
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
            ]
        }
    },
    beforeCreate: function () {
        this.$ajax.get(this.$store.state.api + '/order/list').then(response => {
            this.orderTableData = response.data.result;
        }, response => {
            this.orderTableData = [];
        })
    },
}

</script>
