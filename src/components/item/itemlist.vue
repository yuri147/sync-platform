<style scoped>
.export-btn {
    margin-left: 10px;
}

.list {
    /*width: 100%;*/
    margin-top: 10px;
    margin-bottom: 10px;
}

.model-detail{
    text-align: center;
}
</style>
<template>
    <div>
        <Table stripe class="list" height="750" :columns="tableColumns" :data="itemTableData" ref="itemTable"></Table>
        <div>
            <Button type="primary" size="large" @click="exportData(1)" class="export-btn">
                <Icon type="ios-download-outline"></Icon> 导出为excel
            </Button>
        </div>
        <Modal title="商品图片" :closable="true" v-model="detail" width="782" class-name="model-detail">
            <img v-for="item in imgList" :src="imgPreviewUrl + item + $store.state.imgProcess"></img>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
export default {
    props: [],
    methods: {
        exportData(type) {
            if (type === 1) {
                this.$refs.itemTable.exportCsv({
                    filename: '商品数据'
                });
            }
        },
        show(index) {
            var imgDom = '';
            this.imgList = this.itemTableData[index].itemImg;
            this.detail = true;
            // for (var i = 0; i < imgArr.length; i++) {
            //     var template = '<img src="' + this.imgPreviewUrl + imgArr[i] + '">'
            //     imgDom += template;
            // }

            // this.$Modal.info({
            //     width: 1500,
            //     loading: true,
            //     title: '商品图片',
            //     content: imgDom
            // })
        },
        remove(params) {
            this.$Modal.confirm({
                title: '确认删除该商品？',
                content: '<p>删除后将无法恢复</p>',
                onOk: () => {
                    var itemID = params.row.itemID;
                    this.$ajax.post(this.$store.state.api + '/item/delete', {
                        itemID: itemID
                    }).then(response => {
                        this.$Message.success('删除成功');
                        this.itemTableData.splice(params.index, 1);
                    }, response => {
                        this.$Message.error('删除失败');
                    });
                },
                onCancel: () => { }
            });


        }
    },
    data() {
        return {
            detail: false,
            imgList: [],
            imgPreviewUrl: this.$store.state.imgPath,
            itemTableData: [],
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
            ]
        }
    },
    beforeCreate: function () {
        this.$ajax.get(this.$store.state.api + '/item/list').then(response => {
            this.itemTableData = response.data.result;
        }, response => {
            this.itemTableData = [];
        })
    },
}

</script>
